describe("Bank Accounts API Tests", () => {
  let validUser;
  const apiBankAccountsEndpoint = `${Cypress.config("apiUrl")}/bankAccounts`;
  before(() => {
    cy.getValidUser().then((user) => {
      validUser = user;
    });
  });

  it("should get all bank accounts for authenticated user", () => {
    cy.loginByApi(validUser.username, validUser.password);

    cy.request({
      method: "GET",
      url: apiBankAccountsEndpoint,
      auth: {
        username: validUser.username,
        password: validUser.password,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.exist;
      response.body.results.forEach((account) => {
        cy.log("Bank account:", JSON.stringify(account));
        expect(account).to.have.all.keys(
          "id",
          "uuid",
          "userId",
          "bankName",
          "accountNumber",
          "routingNumber",
          "isDeleted",
          "createdAt",
          "modifiedAt"
        );
      });
    });
  });

  it("should return 401 without authentication", () => {
    cy.request({
      method: "GET",
      url: apiBankAccountsEndpoint,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
    });
  });
});
