Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.get("input[name=email]").type(email);
  cy.get("input[name=password]").type(`${password}{enter}`);
  cy.getCookies("_octopus_access_token").should("exist");
});

it("successfully open navigation", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));

  cy.get("a[href='/tenants']").click().wait(1500);
  cy.url().should("contain", "tenants");

  cy.get("a[href='/helpdesk']").click().wait(1500);
  cy.url().should("contain", "helpdesk");

  cy.get("a[href='/profile']").click().wait(1500);
  cy.url().should("contain", "profile");

  cy.get("a[href='/setting']").click().wait(1500);
  cy.url().should("contain", "setting");
});

it("navigation error when refresh", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));

  cy.get("a[href='/tenants']").click().wait(1500);
  cy.url().should("contain", "tenants");
  cy.reload();
  cy.get("Code").should("contain", "AccessDenied");

  cy.get("a[href='/helpdesk']").click().wait(1500);
  cy.url().should("contain", "helpdesk");
  cy.reload();
  cy.get("Code").should("contain", "AccessDenied");

  cy.get("a[href='/profile']").click().wait(1500);
  cy.url().should("contain", "profile");
  cy.reload();
  cy.get("Code").should("contain", "AccessDenied");

  cy.get("a[href='/setting']").click().wait(1500);
  cy.url().should("contain", "setting");
  cy.reload();
  cy.get("Code").should("contain", "AccessDenied");
});
