const dateOptions = {
  today: "Today",
  yesterday: "Yesterday",
  this_week: "This week",
  this_month: "This month",
  last_week: "Last week",
  last_7: "Last 7 days",
  last_28: "Last 28 days",
  last_30: "Last 30 days",
  last_90: "Last 90 days",
  last_12: "Last 12 months",
  last_calendar_year: "Last calendar year",
  this_year: "This year (Jan - Today)",
  custom: "Custom",
};

const dateList = [
  "Today",
  "Yesterday",
  "This week",
  "This month",
  "Last week",
  "Last 7 days",
  "Last 28 days",
  "Last 30 days",
  "Last 90 days",
  "Last 12 months",
  "Last calendar year",
  "This year (Jan - Today)",
  "Custom",
];

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.get("input[name=email]").type(email);
  cy.get("input[name=password]").type(`${password}{enter}`);
  cy.getCookies("_octopus_access_token").should("exist");
});

// from top to bottom select
// it("select date options from top to buttom", () => {
//   cy.login(Cypress.env("email"), Cypress.env("pass"));
//   cy.get("a[href='/tenants']").click().wait(1000);

//   dateList.forEach((item) => {
//     cy.get(".css-1utx3b-control")
//       .click()
//       .get(".css-1nmdiq5-menu")
//       .contains(item)
//       .click()
//       .get(".css-1dimb5e-singleValue")
//       .should("contain", item)
//       .wait(1500);
//   });
// });

// from bottom to top select
it("random select date options from top to buttom", () => {
  let times = 10;
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get("a[href='/tenants']").click().wait(1000);

  while (times > dateList.length - 1) {
    cy.get(".css-1utx3b-control").click();
    cy.get(".css-1nmdiq5-menu").contains(dateList[times]).click();
    cy.get(".css-1dimb5e-singleValue")
      .should("contain", dateList[times])
      .wait(1500);
    times--;
  }
});

// random select
it("random select date options from top to buttom", () => {
  let times = 0;
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get("a[href='/tenants']").click().wait(1000);

  while (times < dateList.length - 1) {
    const index = Math.floor(Math.random() * 10) + 1;
    cy.get(".css-1utx3b-control")
      .click()
      .get(".css-1nmdiq5-menu")
      .contains(dateList[times])
      .click()
      .get(".css-1dimb5e-singleValue")
      .should("contain", dateList[times])
      .wait(1500);
    times++;
  }
});

it("show date options", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get("a[href='/tenants']").click().wait(1000);
  cy.get(".css-1utx3b-control").click();
  cy.get(".css-1nmdiq5-menu").should("contain", "Today");
});

it("show detail waste", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get("a[href='/tenants']").click().wait(1000);

  cy.get("td > div").contains("24.90").click();
  cy.get("h5").should("contain", "Detail Waste");
});

it("show result search by name", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get("a[href='/tenants']").click().wait(1000);

  cy.get("input[id=search]").type("name{enter}");
  cy.get("p").should("contain", "tenant name");
});

it("not showing any result of search", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get("a[href='/tenants']").click().wait(1000);

  cy.get("input[id=search]").type("asdasdd{enter}");
  cy.get("p").should("contain", "No data found");
});

it("return original data after clear search", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get("a[href='/tenants']").click().wait(1000);

  cy.get("input[id=search]").type("asdasdd{enter}").wait(1500);
  cy.get("p").should("contain", "No data found").wait(3000);

  cy.get("input[id=search]").clear().type("{enter}");
  cy.get("td").should("contain", "1");
});
