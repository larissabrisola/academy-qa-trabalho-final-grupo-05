import { faker } from "@faker-js/faker";

describe("Listagem de avaliações de filmes", function () {
  let movieId;
  let movieTitle;
  let token;
  beforeEach(() => {
    cy.adminCreatesAMovie(
      faker.animal.cat(),
      faker.person.firstName(),
      faker.lorem.sentence(),
      180,
      2024
    ).then(function (response) {
      movieId = response.body.id;
      movieTitle = response.body.title;
    });
  });

  it("Deve ser possível um usuário comum listar as próprias avaliações", function () {
    cy.createAndLoginUser(
      faker.person.firstName() + "ão",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.postReview(movieId, token);
      cy.request({
        method: "GET",
        url: "users/review/all",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then(function (response) {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("Array");
        expect(response.body[0].id).to.be.an("number");
        expect(response.body[0].movieId).to.equal(movieId);
        expect(response.body[0].movieTitle).to.equal(movieTitle);
        expect(response.body[0].score).to.equal(5);
        expect(response.body[0].reviewText).to.equal(
          "Teste review usuário inativado / promovido"
        );
        expect(response.body[0].reviewType).to.equal(0);
      });
    });
  });

  it("Deve ser possível um usuário critico listar as próprias avaliações", function () {
    cy.createAndLoginUser(
      faker.person.firstName() + "ão",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.promoteCritic(token);
      cy.postReview(movieId, token);
      cy.request({
        method: "GET",
        url: "users/review/all",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then(function (response) {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("Array");
        expect(response.body[0].id).to.be.an("number");
        expect(response.body[0].movieId).to.equal(movieId);
        expect(response.body[0].movieTitle).to.equal(movieTitle);
        expect(response.body[0].score).to.equal(5);
        expect(response.body[0].reviewText).to.equal(
          "Teste review usuário inativado / promovido"
        );
        expect(response.body[0].reviewType).to.equal(1);
      });
    });
  });

  it("Deve ser possível um usuário administrador listar as próprias avaliações", function () {
    cy.createAndLoginUser(
      faker.person.firstName() + "ão",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.promoteAdmin(token);
      cy.postReview(movieId, token);
      cy.request({
        method: "GET",
        url: "users/review/all",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then(function (response) {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("Array");
        expect(response.body[0].id).to.be.an("number");
        expect(response.body[0].movieId).to.equal(movieId);
        expect(response.body[0].movieTitle).to.equal(movieTitle);
        expect(response.body[0].score).to.equal(5);
        expect(response.body[0].reviewText).to.equal(
          "Teste review usuário inativado / promovido"
        );
        expect(response.body[0].reviewType).to.equal(0);
      });
    });
  });

  it("Não deve ser possível um usuário não autenticado listar avaliações", function () {
    cy.createAndLoginUser(
      faker.person.firstName() + "ão",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.postReview(movieId, token);
      cy.request({
        method: "GET",
        url: "users/review/all",
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({
          message: "Access denied.",
          error: "Unauthorized",
          statusCode: 401,
        });
      });
    });
  });
});
