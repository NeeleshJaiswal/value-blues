import * as go from 'gojs';

declare global {
    interface Window {
        diagram: go.Diagram;
    }
}
