import React, { useEffect, useRef, useState } from "react";
import * as go from "gojs";
import "./Diagram.css"; // Import the CSS file

const Diagram: React.FC = () => {
    const diagramRef = useRef<HTMLDivElement | null>(null);
    const diagramInstance = useRef<go.Diagram | null>(null);
    const [totalNodes, setTotalNodes] = useState<number>(30); // Default number of nodes
    const [nodeKeys, setNodeKeys] = useState<string[]>([]); // List of node keys for the dropdown
    const [selectedNode, setSelectedNode] = useState<string>(""); // Current selected node key

    useEffect(() => {
        const $ = go.GraphObject.make;

        if (diagramRef.current && !diagramInstance.current) {
            const diagram = $(
                go.Diagram,
                diagramRef.current,
                {
                    initialAutoScale: go.Diagram.UniformToFill,
                    "undoManager.isEnabled": true,
                    "resizingTool.isEnabled": true, // Enable resizing for nodes
                }
            );

            // Node template
            diagram.nodeTemplate = $(
                go.Node,
                "Auto",
                {
                    locationSpot: go.Spot.Center,
                    resizable: true, // Allow resizing
                    resizeObjectName: "SHAPE", // The part of the node to resize
                    click: (_e, obj) => updateDropdownSelection(obj.part?.data.key), // Update dropdown on node click
                },
                $(
                    go.Shape,
                    "Ellipse",
                    {
                        name: "SHAPE",
                        fill: "lightgray",
                        stroke: null,
                        desiredSize: new go.Size(30, 30), // Default size
                    },
                    new go.Binding("fill", "fill"),
                    new go.Binding("desiredSize", "size").makeTwoWay()
                ),
                $(
                    go.TextBlock,
                    { font: "10px sans-serif", stroke: "#000" },
                    new go.Binding("text", "key")
                )
            );

            // Link template
            diagram.linkTemplate = $(
                go.Link,
                { selectable: false },
                $(go.Shape, { strokeWidth: 2, stroke: "#333" })
            );

            // Add event listener for selection change
            diagram.addDiagramListener("ChangedSelection", () => {
                const selectedNode = diagram.selection.first();
                if (selectedNode instanceof go.Node) {
                    setSelectedNode(selectedNode.data.key); // Update the dropdown value
                } else {
                    setSelectedNode(""); // Clear selection if no node is selected
                }
            });

            diagramInstance.current = diagram;
            rebuildGraph();
        }

        return () => {
            if (diagramInstance.current) {
                diagramInstance.current.div = null;
                diagramInstance.current = null;
            }
        };
    }, []);

    const rebuildGraph = () => {
        const diagram = diagramInstance.current;
        if (!diagram) return;

        const layers = Math.ceil(totalNodes / 10); // Number of concentric layers
        const nodesPerLayer = new Array(layers).fill(0).map((_, i) => Math.min(10, totalNodes - i * 10)); // Nodes in each layer
        const nodeDataArray: any[] = [];
        const linkDataArray: any[] = [];

        let keyCounter = 0;

        // Generate nodes for each layer
        for (let layer = 0; layer < layers; layer++) {
            for (let i = 0; i < nodesPerLayer[layer]; i++) {
                const color = layer === 0 ? "red" : layer === 1 ? "orange" : "yellow";
                nodeDataArray.push({
                    key: keyCounter.toString(),
                    fill: color,
                    size: new go.Size(30, 30), // Default size for nodes
                });
                keyCounter++;
            }
        }

        // Add links between nodes
        for (let i = 0; i < nodeDataArray.length - 1; i++) {
            linkDataArray.push({ from: i.toString(), to: (i + 1).toString() });
        }

        diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

        // Update the node keys for the dropdown
        setNodeKeys(nodeDataArray.map((node) => node.key));

        diagram.zoomToFit();
    };

    const highlightNode = (key: string) => {
        const diagram = diagramInstance.current;
        if (!diagram) return;

        diagram.clearSelection(); // Clear any previous selection
        const node = diagram.findNodeForKey(key);
        if (node) {
            node.isSelected = true; // Highlight the node by selecting it
            setSelectedNode(key); // Update the dropdown value
        }
    };

    const updateDropdownSelection = (key: string | undefined) => {
        if (key) {
            setSelectedNode(key); // Update dropdown when a node is clicked
        }
    };

    return (
        <div className="diagram-container">
            <div className="toolbar">
                <label>Nodes:</label>
                <input
                    type="number"
                    value={totalNodes}
                    onChange={(e) => setTotalNodes(Math.max(1, parseInt(e.target.value, 10) || 1))}
                />
                <button onClick={rebuildGraph}>Rebuild Graph</button>
                <label>Select Node:</label>
                <select
                    value={selectedNode}
                    onChange={(e) => highlightNode(e.target.value)}
                >
                    <option value="">--Select Node--</option>
                    {nodeKeys.map((key) => (
                        <option key={key} value={key}>
                            Node {key}
                        </option>
                    ))}
                </select>
            </div>
            <div ref={diagramRef} className="diagram-canvas"></div>
        </div>
    );
};

export default Diagram;