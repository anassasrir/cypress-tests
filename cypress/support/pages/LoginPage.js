class LoginPage {
  get usernameField() {
    return "#username";
  }

  get passwordField() {
    return "#password";
  }

  get loginButton() {
    return '[data-test="signin-submit"]';
  }

  get signUpButton() {
    return '[data-test="signup"]';
  }

  get errorMessageContainer() {
    return '[data-test="signin-error"]';
  }

  get errorUsername() {
    return "#username-helper-text";
  }

  get errorPassword() {
    return "#password-helper-text";
  }

  get rememberMeCheckbox() {
    return '[name="remember"]';
  }

  fillCredentials(username, password) {
    cy.get(this.usernameField).type(username);
    cy.get(this.passwordField).type(password);
  }

  login(username, password) {
    this.fillCredentials(username, password);
    cy.get(this.loginButton).click();
  }
}

export default new LoginPage();
