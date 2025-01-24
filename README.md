# Value Blue - Diagram Application

## Overview

The **Value Blue Diagram Application** is a React-based project that allows users to view and interact with two types of diagrams:
- **Standard Diagram**
- **Packed Diagram**

The application uses the [GoJS library](https://gojs.net/latest/) for rendering diagrams, enabling features like resizing nodes, linking nodes, and applying various layouts.

---

## Features

### General
- **Interactive Diagrams**: Easily switch between Standard and Packed diagrams.
- **Customizable Node Count**: Users can specify the number of nodes to render dynamically.
- **Selection Synchronization**: Selecting a node from the canvas or dropdown highlights it in both views.
- **Resizable Nodes**: Resize any node directly on the canvas.

### Diagram Types
1. **Standard Diagram**: Displays a diagram with layers which resizable, and movable.
2. **Packed Diagram**: Displays a packed diagram layout optimized for minimal space with a higher amount of nodes (10k-20k-30K).

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org) (v18 or higher)
- npm (comes with Node.js)

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/value-blue.git
   cd value-blue

2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm start
4. Open your browser and navigate to:

   [http://localhost:5173](http://localhost:5173)



### Prerequisites
React: Component-based library for building UI.
TypeScript: Ensures type safety across the project.
GoJS: A JavaScript library for interactive diagrams and graphs.
Jest: Testing framework for unit tests.
