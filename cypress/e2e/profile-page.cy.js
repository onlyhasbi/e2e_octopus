Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.get("input[name=email]").type(email);
  cy.get("input[name=password]").type(`${password}{enter}`);
  cy.getCookies("_octopus_access_token").should("exist");
});

it("wrong error border when hit save", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get("a[href='/profile']").click().wait(1000);

  cy.get("button").contains("Save Changes").click();
  cy.get("input[id=password]").should("have.class", "border-red-500");
  cy.get("input[id=confirm_password]").should("have.class", "border-red-500");
});

it("showing succes saving without new password fill", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get("a[href='/profile']").click().wait(1000);

  cy.get("button").contains("Save Changes").click().click().click();
  cy.get("p").should("not.be.visible", "Success");
});
