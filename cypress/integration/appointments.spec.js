const baseURL = "http://localhost:8000/";

describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", `${baseURL}api/debug/reset`);
    cy.visit(baseURL);
    cy.contains("li", "Monday");
  });

  it("should book an appointment", () => {
    cy.get('img[alt="Add"]').first().click();

    cy.get('[data-testid="student-name-input"]').type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]').click();
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones").contains(
      "Sylvia Palmer"
    );
  });

  it("should edit an interview", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
      .get('[alt="Edit"]')
      .click({ force: true });

    cy.get('[data-testid="student-name-input"]').clear().type("Nicolas Cage");
    cy.get('[alt="Tori Malcolm"]').click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Nicolas Cage").contains(
      "Tori Malcolm"
    );
  });

  it("should delete an appointment", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
      .get('[alt="Delete"]')
      .click({ force: true });

    cy.contains("Confirm").click();

    cy.get('[data-testid="appointment"]')
      .first()
      .not(".appointment__card--show");
  });
});
