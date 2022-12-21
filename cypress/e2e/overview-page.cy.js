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

//from top to bottom select
it("select date options from up to buttom", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  dateList.forEach((item) => {
    cy.get(".css-1utx3b-control").click();
    cy.get(".css-1nmdiq5-menu").contains(item).click().wait(1500);
  });
});

//from bottom to top select
it("random select date options from bottom to top", () => {
  let times = 10;
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  while (times > dateList.length - 1) {
    cy.get(".css-1utx3b-control").click();
    cy.get(".css-1nmdiq5-menu").contains(dateList[times]).click().wait(1500);
    times--;
  }
});

//random select
it("random select date options from top to buttom", () => {
  let times = 0;
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  while (times < dateList.length - 1) {
    const index = Math.floor(Math.random() * 10) + 1;
    cy.get(".css-1utx3b-control").click();
    cy.get(".css-1nmdiq5-menu").contains(dateList[index]).click().wait(1500);
    times++;
  }
});

//get an error output
it("error showing total recyclable", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get(".css-1utx3b-control").click();
  cy.get(".css-1nmdiq5-menu").contains(dateOptions.last_28).click().wait(1500);
  cy.get(".css-1utx3b-control").click();
  cy.get(".css-1nmdiq5-menu").contains(dateOptions.last_7).click().wait(1500);
  cy.get("span").should("contain", "NaN");
});

it("show history dialog", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get("button").contains("Detail").click();
  cy.get("p").should("contain", "History Order");
});

it("show download dialog", () => {
  cy.login(Cypress.env("email"), Cypress.env("pass"));
  cy.get("button").contains("Download").click();
  cy.get("h5").should("contain", "Download Report");
});
