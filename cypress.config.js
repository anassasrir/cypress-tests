require("dotenv").config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "mvuaor",
  e2e: {
    baseUrl: "http://localhost:3000",
    apiUrl: "http://localhost:3001",
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {},
    env: {
      CYPRESS_SEEDED_USERNAME: process.env.CYPRESS_SEEDED_USERNAME,
      CYPRESS_PASSWORD: process.env.CYPRESS_PASSWORD,
      localValidUser: {
        username: process.env.CYPRESS_USERNAME,
        password: process.env.CYPRESS_PASSWORD,
      },
    },
  },
});
