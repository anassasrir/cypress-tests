class BankAccountsPage {
  get newBankAccountButton() {
    return "[data-test='bankaccount-new']";
  }

  getBankNameField() {
    return "#bankaccount-bankName-input";
  }

  getRoutingNumberField() {
    return "#bankaccount-routingNumber-input";
  }

  getAccountNumberField() {
    return "#bankaccount-accountNumber-input";
  }

  createNewBankAccount(accountName, routingNumber, accountNumber) {
    cy.get(this.newBankAccountButton).click();
    cy.get(this.getBankNameField()).type(accountName);
    cy.get(this.getRoutingNumberField()).type(routingNumber);
    cy.get(this.getAccountNumberField()).type(accountNumber);
    cy.get("[data-test='bankaccount-submit']").click();
  }
}
export default new BankAccountsPage();
