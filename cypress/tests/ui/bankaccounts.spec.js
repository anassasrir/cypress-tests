import LoginPage from "../../support/pages/LoginPage";
import Navigation from "../../support/pages/Navigation";
import BankAccountsPage from "../../support/pages/BankAccountsPage";

const user = Cypress.env("validUser");
let bankaccountData;

describe("Bank Accounts Tests", () => {
  beforeEach(() => {
    LoginPage.login(user.username, user.password);
    cy.fixture("bankaccounts").then((data) => {
      bankaccountData = data;
    });
  });

  it("should load bank accounts page", () => {
    Navigation.goToBankAccountsPage();
    cy.location("pathname").should("eq", "/bankaccounts");
  });

  it("should open new bank account form", () => {
    Navigation.goToBankAccountsPage();
    cy.get(BankAccountsPage.newBankAccountButton).click();
    cy.get("[data-test='bankaccount-form']").should("be.visible");
  });
  it("should create a new bank account", () => {
    const validAccount = bankaccountData.validAccount;
    Navigation.goToBankAccountsPage();
    BankAccountsPage.createNewBankAccount(
      validAccount.accountName,
      validAccount.routingNumber,
      validAccount.accountNumber
    );
  });

  it("should validate bank account form fields", () => {});

  it("should display error for invalid routing number", () => {});

  it("should display error for invalid account number", () => {});

  it("should delete a bank account", () => {
    const accountToDelete = bankaccountData.accountToDelete;
    Navigation.goToBankAccountsPage();
    BankAccountsPage.createNewBankAccount(
      accountToDelete.accountName,
      accountToDelete.routingNumber,
      accountToDelete.accountNumber
    );
    cy.contains(
      "[data-test^='bankaccount-list-item-']",
      accountToDelete.accountName
    )
      .invoke("attr", "data-test")
      .then((attributeValue) => {
        cy.get(`[data-test='${attributeValue}']`)
          .find("[data-test='bankaccount-delete']")
          .click();
      });
  });
});
