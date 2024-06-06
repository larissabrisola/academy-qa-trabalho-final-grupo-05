const { defineConfig } = require("cypress");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000, // o site tá lentinho, tive que aumentar 
    env: {
      register_url: "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/register",
      login_url: "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login", 
      manageAccount: "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/account", 
      TAGS: "not @ignore",
    },
    specPattern: "cypress/e2e/**/*.feature",

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );

      return config;
    },
  },
});