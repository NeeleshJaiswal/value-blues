import * as go from "gojs";

import {PackedLayout, PackShape} from "../components/packedDiagram/packed-library/PackedLayout";


/**
 * Initializes the GoJS Diagram.
 */
export let initializePackedDiagram = (div: HTMLDivElement): go.Diagram => {
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, div, {
        layout: new PackedLayout(),
        scale: 0.75,
        allowZoom: true,
        allowHorizontalScroll: true,
        allowVerticalScroll: true,
        "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
        "animationManager.isEnabled": true,
    });

    defineTemplates(diagram);

    // Prevent layout interference during resizing
    diagram.addDiagramListener("PartResized", () => {
        const layout = diagram.layout as PackedLayout;
        layout.isValidLayout = false;
    });

    return diagram;
};

/**
 * Defines node and link templates for the diagram.
 */
const defineTemplates = (diagram: go.Diagram) => {
    const $ = go.GraphObject.make;

    diagram.nodeTemplate = $(
        go.Node,
        "Auto",
        {
            locationSpot: go.Spot.Center,
            resizable: true,
            resizeObjectName: "SHAPE",
            movable: true,
        },
        $(
            go.Shape,
            {
                name: "SHAPE",
                strokeWidth: 0,
                fill: go.Brush.randomColor(),
            },
            new go.Binding("figure"),
            new go.Binding("width"),
            new go.Binding("height"),
            new go.Binding("fill")
        ),
        $(
            go.TextBlock,
            {
                name: "TEXT",
                margin: 3,
                font: "bold 10px sans-serif",
                editable: true,
            },
            new go.Binding("text", "key").makeTwoWay()
        )
    );

    diagram.linkTemplate = $(
        go.Link,
        {
            routing: go.Link.Normal,
            curve: go.Link.None,
        },
        $(go.Shape, { strokeWidth: 2 }, new go.Binding("stroke", "color")),
        $(go.Shape, { toArrow: "Standard" }, new go.Binding("fill", "color")),
        $(
            go.TextBlock,
            {
                name: "TEXT",
                segmentOffset: new go.Point(0, -10),
                font: "bold 10px sans-serif",
                stroke: "white",
                margin: 2,
            },
            new go.Binding("text", "label"),
            new go.Binding("background", "color")
        )
    );
};

/**
 * Generates node data.
 */
export let generatePackedNodeData = (numNodes: number): Array<any> => {
    const size = 50;
    return Array.from({ length: numNodes }, (_, i) => ({
        key: i.toString(),
        figure: "Ellipse",
        fill: getRandomColor(),
        width: size,
        height: size,
    }));
};

/**
 * Generates link data connecting nodes in pairs.
 */
export const generatePackedLinkData = (nodes: Array<any>): Array<any> => {
    const links: Array<any> = [];
    let labelCounter = 1;

    for (let i = 0; i < nodes.length; i += 2) {
        if (i + 1 < nodes.length) {
            const linkColor = getRandomColor();
            links.push({
                from: nodes[i].key,
                to: nodes[i + 1].key,
                label: `L-${labelCounter++}`,
                color: linkColor,
            });
        }
    }

    return links;
};

/**
 * Applies layout settings to the diagram.
 */
export let applyLayout = (diagram: go.Diagram) => {
    diagram.startTransaction("Apply Layout");

    const layout = diagram.layout as PackedLayout;
    layout.packShape = PackShape.Elliptical;
    layout.aspectRatio = 1.0;
    layout.spacing = 10;

    diagram.commitTransaction("Apply Layout");
};

/**
 * Generates a random color in hexadecimal format.
 */
const getRandomColor = (): string => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
};
