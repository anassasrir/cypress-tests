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
  const seededUsername = Cypress.env("CYPRESS_SEEDED_USERNAME");
  const secretPassword = Cypress.env("CYPRESS_PASSWORD");

  const localValidUser = Cypress.env("localValidUser");

  let userObject;
  console.log(
    "CYPRESS_SEEDED_USERNAME:",
    Cypress.env("CYPRESS_SEEDED_USERNAME")
  );
  console.log("CYPRESS_PASSWORD:", Cypress.env("CYPRESS_PASSWORD"));
  console.log("Cypress.env():", Cypress.env());
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

Cypress.Commands.add("loginByApi", (username, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.config("apiUrl")}/login`,
    body: {
      username,
      password,
    },
  });
});
