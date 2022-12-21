const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://building.octoid.be",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
