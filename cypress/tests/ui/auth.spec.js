import { loginPageSelectors } from "../../support/pages/loginSelectors";

describe("Authentication Tests", () => {
  const user = Cypress.env("validUser");

  it("should load the login page", () => {
    cy.location("pathname").should("eq", "/signin");
  });

  it("should navigate to signup page", () => {
    cy.get(loginPageSelectors.signUpButton).click();
    cy.location("pathname").should("eq", "/signup");
  });

  it("should login successfully with valid credentials", () => {
    cy.get(loginPageSelectors.usernameField).type(user.username);
    cy.get(loginPageSelectors.passwordField).type(user.password);
    cy.get(loginPageSelectors.loginButton).click();
    cy.location("pathname").should("eq", "/");
  });

  it("should display error on invalid login", () => {
    cy.get(loginPageSelectors.usernameField).type("invalidUser");
    cy.get(loginPageSelectors.passwordField).type("wrongPassword");
    cy.get(loginPageSelectors.loginButton).click();
    cy.get(loginPageSelectors.errorMessageContainer)
      .should("be.visible")
      .and("contain", "Username or password is invalid");
  });

  it("should disable login button when fields are empty", () => {
    cy.get(loginPageSelectors.passwordField).type(user.password);
    cy.get(loginPageSelectors.errorUsername)
      .should("be.visible")
      .contains("Username is required");
    cy.get(loginPageSelectors.loginButton).should("be.disabled");
    cy.get(loginPageSelectors.usernameField).type(user.username);
    cy.get(loginPageSelectors.passwordField).clear();
    cy.get(loginPageSelectors.loginButton).should("be.disabled");
  });

  it("should show error for short password", () => {
    cy.get(loginPageSelectors.passwordField).type("123");
    cy.get(loginPageSelectors.usernameField).type(user.username);

    cy.get(loginPageSelectors.errorPassword)
      .should("be.visible")
      .and("contain", "Password must contain at least 4 characters");
  });

  it("should remember a user for 30 days after login", function () {
    cy.get(loginPageSelectors.usernameField).type(user.username);
    cy.get(loginPageSelectors.passwordField).type(user.password);
    cy.get(loginPageSelectors.rememberMeCheckbox).check();
    cy.get(loginPageSelectors.loginButton).click();
    cy.location("pathname").should("eq", "/");
  });
});
