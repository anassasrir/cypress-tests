class Navigation {
  goToHomePage() {}

  goToMyAccountPage() {}

  goToBankAccountsPage() {
    cy.get("[data-test='sidenav-bankaccounts']").click();
  }

  goToNotificationsPage() {}

  logout() {}
}
export default new Navigation();
