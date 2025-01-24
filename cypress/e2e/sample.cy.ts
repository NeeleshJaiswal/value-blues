

describe("My First Test", () => {
    it("Visits the app root", () => {
        cy.visit("/");
        cy.contains("Vite + React"); // Update this text to match your app's content
    });
});
