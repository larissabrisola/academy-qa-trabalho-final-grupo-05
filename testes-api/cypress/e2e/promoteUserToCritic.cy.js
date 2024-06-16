import { faker } from "@faker-js/faker";
describe("Promover usuário a crítico", () => {
  let token;
  let nome;
  let email;

  beforeEach(() => {
    nome = faker.person.fullName();
    email = faker.internet.email();
    cy.createAndLoginUser(nome, email, "123456", true).then((response) => {
      token = response.token;
      Cypress.env("accessToken", token);
    });
  });

  afterEach(() => {
    cy.inactivateUser(token);
  });

  it("Deve ser possivel promover a si mesmo como critico", () => {
    cy.request({
      method: "PATCH",
      url: "users/apply",
      failOnStatusCode: true,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });

  it("Deve ser possível um usuário critico se tornar administrador", () => {
    cy.promoteCritic(token);
    cy.request({
      method: "PATCH",
      url: "users/admin",
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });

  it("A review anterior não deve ser alterada após a promoção do usuário a critico", () => {
    cy.promoteAdmin(token);
    cy.createMovie().then((response) => {
      cy.wrap(response).as("data");
    });
    cy.inactivateUser(token);

    cy.createAndLoginUser(
      faker.person.fullName(),
      faker.internet.email(),
      "123456"
    ).then((data) => {
      token = data.token;
      cy.get("@data").then((data) => {
        cy.postReview(data.id, token);
      });
      cy.promoteCritic(token);
      cy.inactivateUser(token);
    });

    cy.createAndLoginUser(
      faker.person.fullName(),
      faker.internet.email(),
      "123456"
    ).then((data) => {
      token = data.token;
      cy.get("@data").then((data) => {
        cy.request("GET", "movies/" + data.id).then((response) => {
          expect(response.body.reviews[0].reviewText).to.deep.equal(
            "Teste review usuário inativado / promovido"
          );
          expect(response.body.reviews[0].reviewType).to.equal(0);
          expect(response.body.reviews[0].score).to.equal(5);
          expect(response.body.reviews[0].user.type).to.equal(2);
        });
      });
    });
  });
});
describe("Promover usuário - usuário não logado", () => {
  it("Não deve ser possível fazer a promoção para crítico sem fazer o login do usuário", () => {
    cy.request({
      method: "PATCH",
      url: "users/apply",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.statusCode).to.equal(401);
      expect(response.body.error).to.deep.equal("Unauthorized");
      expect(response.body.message).to.deep.equal("Access denied.");
    });
  });
});
