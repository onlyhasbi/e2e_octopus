Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.get("input[name=email]").type(email);
  cy.get("input[name=password]").type(`${password}{enter}`);
  cy.getCookies("_octopus_access_token").should("exist");
});

// it("wrong error border when hit save", () => {
//   cy.login(Cypress.env("email"), Cypress.env("pass"));
//   cy.get('a[href*="/profile"]').click().wait(1000);

//   cy.get("button").contains("Save Changes").click();
//   cy.get("input[id=password]").should("have.class", "border-red-500");
//   cy.get("input[id=confirm_password]").should("have.class", "border-red-500");
// });

// it("showing success saving without new password fill", () => {
//   cy.login(Cypress.env("email"), Cypress.env("pass"));
//   cy.get('a[href*="/profile"]').click().wait(1000);

//   cy.get("button").contains("Save Changes").click().click().click();
//   cy.get("p").contains("Success").should("not.be.visible");
// });

// it("change name", () => {
//   cy.login(Cypress.env("email"), Cypress.env("pass"));
//   cy.get('a[href*="/profile"]').click().wait(1000);

//   cy.get("input[id=password]").type(Cypress.env("pass"));
//   cy.get("input[id=confirm_password]").type(Cypress.env("pass"));

//   //inconsistent close dialog
//   cy.get("input[id=first_name]").clear().type("Admin");
//   cy.get("button").contains("Save Changes").click().click();
//   cy.get("p").should("contain", "Success").wait(3000);
//   cy.get("div").contains("Success").click({ force: true });

//   cy.get("input[id=last_name]").clear().type("Octopus");
//   cy.get("button").contains("Save Changes").click().click();
//   cy.get("p").should("contain", "Success").wait(3000);
//   cy.get("div").contains("Success").click({ force: true });
// });

it("upload new photo profile", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get('a[href*="/profile"]').click().wait(1000);
  cy.get("div").contains("upload").click().wait(5000);
  cy.visit("/");
});
