import LoginPage from "../../support/pages/LoginPage";
describe("Authentication Tests", () => {
  beforeEach(function () {
    cy.getValidUser().then((userObject) => {
      this.user = userObject;
    });
  });

  it("should load the login page", () => {
    cy.location("pathname").should("eq", "/signin");
  });

  it("should navigate to signup page", () => {
    cy.get(LoginPage.signUpButton).click();
    cy.location("pathname").should("eq", "/signup");
  });

  it("should login successfully with valid credentials", function () {
    LoginPage.login(this.user.username, this.user.password);
    cy.location("pathname").should("eq", "/");
  });

  it("should display error on invalid login", () => {
    LoginPage.login("invalidUser", "wrongPassword");
    cy.get(LoginPage.errorMessageContainer)
      .should("be.visible")
      .and("contain", "Username or password is invalid");
  });

  it("should disable login button when fields are empty", function () {
    cy.get(LoginPage.passwordField).type(this.user.password);
    cy.get(LoginPage.errorUsername)
      .should("be.visible")
      .contains("Username is required");
    cy.get(LoginPage.loginButton).should("be.disabled");
    cy.get(LoginPage.usernameField).type(this.user.username);
    cy.get(LoginPage.passwordField).clear();
    cy.get(LoginPage.loginButton).should("be.disabled");
  });

  it("should show error for short password", function () {
    cy.get(LoginPage.passwordField).type("123");
    cy.get(LoginPage.usernameField).type(this.user.username);
    cy.get(LoginPage.errorPassword)
      .should("be.visible")
      .and("contain", "Password must contain at least 4 characters");
  });

  it("should remember a user for 30 days after login", function () {
    LoginPage.fillCredentials(this.user.username, this.user.password);
    cy.get(LoginPage.rememberMeCheckbox).check();
    cy.get(LoginPage.loginButton).click();
    cy.location("pathname").should("eq", "/");
  });
});
