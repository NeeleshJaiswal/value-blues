import React, { useState } from "react";

import PackedDiagram from "./components/packedDiagram/PackedDiagram";
import Diagram from "./components/diagram/Diagram";

/**
 * Main App Component
 */
const App: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<"PackedDiagram" | "Diagram">("Diagram"); // Default to "Diagram"

    return (
        <div className="app-container">
            <header className="header">
                <h1 className="app-title">Diagram Application</h1>
                <div className="button-container">
                    <button
                        className={`button ${activeComponent === "PackedDiagram" ? "active" : ""}`}
                        onClick={() => setActiveComponent("PackedDiagram")}
                    >
                        Packed Diagram
                    </button>
                    <button
                        className={`button ${activeComponent === "Diagram" ? "active" : ""}`}
                        onClick={() => setActiveComponent("Diagram")}
                    >
                        Standard Diagram
                    </button>
                </div>
            </header>

            <main className="component-container">
                {activeComponent === "PackedDiagram" && <PackedDiagram />}
                {activeComponent === "Diagram" && <Diagram />}
            </main>
        </div>
    );
};

export default App;
