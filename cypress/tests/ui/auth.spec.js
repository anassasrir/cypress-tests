import { loginPageSelectors } from "../../support/pages/loginSelectors";

describe("Authentication Tests", () => {
  it("should load the login page", () => {
    cy.visit("");
    cy.location("pathname").should("eq", "/signin");
  });

  it("should navigate to signup page", () => {
    cy.visit("");
    cy.get(loginPageSelectors.signUpButton).click();
    cy.location("pathname").should("eq", "/signup");
  });

  it("should login successfully with valid credentials", () => {
    const user = Cypress.env("validUser");
    cy.visit("");
    cy.get(loginPageSelectors.usernameField).type(user.username);
    cy.get(loginPageSelectors.passwordField).type(user.password);
    cy.get(loginPageSelectors.loginButton).click();
    cy.location("pathname").should("eq", "/");
  });

  it("should display error on invalid login", () => {
    cy.visit("");
    cy.get(loginPageSelectors.usernameField).type("invalidUser");
    cy.get(loginPageSelectors.passwordField).type("wrongPassword");
    cy.get(loginPageSelectors.loginButton).click();
    cy.get(loginPageSelectors.errorMessageContainer)
      .should("be.visible")
      .and("contain", "Username or password is invalid");
  });
});
