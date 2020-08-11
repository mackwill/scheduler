const baseURL = "http://localhost:8000";

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("http://localhost:8000/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit(`${baseURL}/`);

    cy.contains("li", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
