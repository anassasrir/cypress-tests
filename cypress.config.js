require("dotenv").config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "mvuaor",
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {},
    env: {
      validUser: {
        username: process.env.CYPRESS_USERNAME,
        password: process.env.CYPRESS_PASSWORD,
      },
    },
  },
});
