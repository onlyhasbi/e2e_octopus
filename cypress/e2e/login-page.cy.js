Cypress.Commands.add("open", (url) => {
  cy.visit(url);
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/")
    .get("input[name=email]")
    .type(email)
    .get("input[name=password]")
    .type(password)
    .get("button")
    .contains("Login")
    .should("be.visible")
    .click();
  cy.getCookies("_octopus_access_token").should("exist");
});

it("successfully loads sign in page", () => {
  cy.open("/");
});

it("signin succeed", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
});

it("signin failed", () => {
  cy.login(Cypress.env("wrong_email"), Cypress.env("wrong_pass"));
  cy.url().should("contain", "signin");
});

it("UI should reflect user being log in", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get("span").should("contain", "Admin Octopus");
});

it("show contact us modal", () => {
  cy.open("/");
  cy.get("p").contains("Forget password?").click();
  cy.get("p").should("contain", "Contact Us");
});

it("show helpdesk modal", () => {
  cy.open("/");
  cy.get('a[href*="https://wa.me/628118880936"]')
    .should("contain", "Ask our Helpdesk")
    .click();
});

it("showing access denied error", () => {
  cy.open("/").wait(1000);
  cy.reload();
});
