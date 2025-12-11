// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getValidUser", () => {
  const seededUsername = Cypress.env("SEEDED_USERNAME");
  const secretPassword = Cypress.env("CYPRESS_PASSWORD");

  const localValidUser = Cypress.env();

  let userObject;

  if (seededUsername) {
    userObject = {
      username: seededUsername,
      password: secretPassword,
    };
  } else if (localValidUser && localValidUser.username) {
    userObject = localValidUser;
  } else {
    throw new Error("No valid user credentials found in environment variables");
  }
  return userObject;
});
