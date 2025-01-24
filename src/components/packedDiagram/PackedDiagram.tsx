import React, { useEffect, useRef, useState } from "react";
import * as go from "gojs";

import "./PackedDiagram.css";
import {
    applyLayout,
    generatePackedLinkData,
    generatePackedNodeData,
    initializePackedDiagram,
} from "../../util/DiagramUtils";

const PackedDiagram: React.FC = () => {
    const diagramRef = useRef<HTMLDivElement | null>(null);
    const diagramInstance = useRef<go.Diagram | null>(null);
    const [numNodes, setNumNodes] = useState<number>(100); // Default set to 100 nodes

    useEffect(() => {
        if (diagramRef.current && !diagramInstance.current) {
            const diagram = initializePackedDiagram(diagramRef.current);
            diagramInstance.current = diagram;
            rebuildGraph(100);
        }

        return () => {
            if (diagramInstance.current) {
                diagramInstance.current.div = null;
                diagramInstance.current = null;
            }
        };
    }, []);


    const rebuildGraph = (nodeCount = numNodes) => {
        if (!diagramInstance.current) return;

        const nodes = generatePackedNodeData(nodeCount);
        const links = generatePackedLinkData(nodes);

        diagramInstance.current.model = new go.GraphLinksModel(nodes, links);
        applyLayout(diagramInstance.current);
        diagramInstance.current.zoomToFit();
    };

    return (
        <div className="diagram-container">
            <div className="controls">
                <label>
                    Nodes:
                    <input
                        type="number"
                        value={numNodes}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setNumNodes(value);
                            rebuildGraph(value); // Rebuild graph on input change
                        }}
                        className="node-input"
                    />
                </label>
                <button onClick={() => rebuildGraph()} className="rebuild-button">
                    Rebuild Graph
                </button>
            </div>
            <div ref={diagramRef} className="diagram-area" />
        </div>
    );
};

export default PackedDiagram;
