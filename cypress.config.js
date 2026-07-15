const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev",

    env: {
      apiUrl: "https://serverest.dev",
    },

    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",

    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",

    video: true,
    screenshotOnRunFailure: true,

    viewportWidth: 1366,
    viewportHeight: 768,

    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 30000,

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
