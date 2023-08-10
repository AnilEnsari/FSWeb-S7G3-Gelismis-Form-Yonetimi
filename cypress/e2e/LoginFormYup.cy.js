describe("Formtesti", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Test name validation", () => {
    cy.get("[data-cy=isiminput]").type("an");
    cy.contains("En az 3 karakter lütfen");
  });
  it("Test name validation", () => {
    cy.get("[data-cy=sifreinput]").type(23421);
    cy.contains("Şifreniz en az 6 olmalı");
  });
});
