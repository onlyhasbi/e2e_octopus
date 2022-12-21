const position = [
  { label: "Team Leader", value: "team_leader" },
  { label: "Manager", value: "manager" },
  { label: "Assistant Manager", value: "assistant_manager" },
  { label: "Executive", value: "executive" },
  { label: "Director", value: "director" },
  { label: "Coordinator", value: "coordinator" },
  { label: "Administrator", value: "administrator" },
  { label: "Controller", value: "controller" },
];

const issue = [
  { label: "Facility", value: "facility" },
  { label: "Pickup Issue", value: "pickup_issue" },
  { label: "Service Quality", value: "service_quality" },
  { label: "Others", value: "others" },
];

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

it("showing error on input when no data fill in form", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get('a[href*="/helpdesk"]').click().wait(1000);
  cy.get("button").contains("Submit Now").click();
  cy.get("input[id=name]").should("have.class", "border-red-500");
  cy.get("input[id=phone]").should("have.class", "border-red-500");
  cy.get("select[id=position]").should("have.class", "border-red-500");
  cy.get("input[id=email]").should("have.class", "border-red-500");
  cy.get("select[id=issue]").should("have.class", "border-red-500");
  cy.get("textarea[id=message]").should("have.class", "border-red-500");
});

it("showing error on input except name", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get('a[href*="/helpdesk"]').click().wait(1000);
  cy.get("input[id=name]").type("a");
  cy.get("button").contains("Submit Now").click();
  cy.get("input[id=phone]").should("have.class", "border-red-500");
  cy.get("select[id=position]").should("have.class", "border-red-500");
  cy.get("input[id=email]").should("have.class", "border-red-500");
  cy.get("select[id=issue]").should("have.class", "border-red-500");
  cy.get("textarea[id=message]").should("have.class", "border-red-500");
});

it("showing error on input except name and phone", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get('a[href*="/helpdesk"]').click().wait(1000);
  cy.get("input[id=name]").type("a");
  cy.get("input[id=phone]").type("a");
  cy.get("button").contains("Submit Now").click();
  cy.get("select[id=position]").should("have.class", "border-red-500");
  cy.get("input[id=email]").should("have.class", "border-red-500");
  cy.get("select[id=issue]").should("have.class", "border-red-500");
  cy.get("textarea[id=message]").should("have.class", "border-red-500");
});

it("showing error on input except name, phone, position", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get('a[href*="/helpdesk"]').click().wait(1000);
  cy.get("input[id=name]").type("a");
  cy.get("input[id=phone]").type("b");
  cy.get("select[id=position]").select(position[0].label);
  cy.get("button").contains("Submit Now").click();
  cy.get("input[id=email]").should("have.class", "border-red-500");
  cy.get("select[id=issue]").should("have.class", "border-red-500");
  cy.get("textarea[id=message]").should("have.class", "border-red-500");
});

it("showing error on input issue and message", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get('a[href*="/helpdesk"]').click().wait(1000);
  cy.get("input[id=name]").type("a");
  cy.get("input[id=phone]").type("b");
  cy.get("select[id=position]").select(position[0].label);
  cy.get("input[id=email]").type("a@b.com");
  cy.get("button").contains("Submit Now").click();
  cy.get("select[id=issue]").should("have.class", "border-red-500");
  cy.get("textarea[id=message]").should("have.class", "border-red-500");
});

it("showing error on input message", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get('a[href*="/helpdesk"]').click().wait(1000);
  cy.get("input[id=name]").type("a");
  cy.get("input[id=phone]").type("b");
  cy.get("select[id=position]").select(position[0].label);
  cy.get("input[id=email]").type("a@b.com");
  cy.get("select[id=issue]").select(issue[0].label);
  cy.get("button").contains("Submit Now").click();
  cy.get("textarea[id=message]").should("have.class", "border-red-500");
});

it("no error showing on input, success popup show", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get('a[href*="/helpdesk"]').click().wait(1000);
  cy.get("input[id=name]").type("a");
  cy.get("input[id=phone]").type("b");

  let p = 0;
  while (p < position.length) {
    cy.get("select[id=position]")
      .select(position[p].label)
      .get("select[id=position]")
      .should("have.value", position[p].value);
    p++;
  }

  cy.get("input[id=email]").type("a@b.com");

  let i = 0;
  while (i < issue.length) {
    cy.get("select[id=issue]")
      .select(issue[i].label)
      .get("select[id=issue]")
      .should("have.value", issue[i].value);
    i++;
  }

  cy.get("textarea[id=message]").type("a");
  cy.get("button").contains("Submit Now").click();
  cy.get("p").should("contain", "Success");
});
