import { faker } from "@faker-js/faker";

describe("Consulta detalhada de filmes", function () {
  let movieId;
  let titleMovie;
  let genreMovie;
  let descriptionMovie;
  let durationInMinutes;
  let releaseYear;
  let token;
  let id;

  before(function () {
    cy.adminCreatesAMovie(
      faker.person.firstName() + "âo O Filme",
      "Ação",
      "Não tenho nada...",
      180,
      2024
    ).then(function (response) {
      movieId = response.body.id;
      titleMovie = response.body.title;
      descriptionMovie = response.body.description;
      genreMovie = response.body.genre;
      durationInMinutes = response.body.durationInMinutes;
      releaseYear = response.body.releaseYear;
    });
  });

  describe("Usuário comum", function () {
    it("Deve ser possível encontrar um filme por id como usuário comum", function () {
      cy.createAndLoginUser(
        "Eriko",
        faker.internet.exampleEmail(),
        "123456"
      ).then(function (response) {
        token = response.token;
        id = response.id;
        cy.postReview(movieId, token);

        cy.request({
          method: "GET",
          url: "movies/" + movieId,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal({
            id: movieId,
            title: titleMovie,
            description: descriptionMovie,
            genre: genreMovie,
            durationInMinutes: durationInMinutes,
            releaseYear: releaseYear,
            criticScore: response.body.criticScore,
            audienceScore: response.body.audienceScore,
            reviews: response.body.reviews,
          });
          cy.promoteAdmin(token);
          cy.deleteUser(id, token);
        });
      });
    });
  });

  describe("Usuário critico", function () {
    it("Deve ser possível encontrar um filme por id como usuário critico", function () {
      cy.createAndLoginCritic(
        "julius",
        faker.internet.exampleEmail(),
        "everybody"
      ).then((response) => {
        token = response.token;
        id = response.id;
        cy.postReview(movieId, token);

        cy.request({
          method: "GET",
          url: "movies/" + movieId,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal({
            id: movieId,
            title: titleMovie,
            description: descriptionMovie,
            genre: genreMovie,
            durationInMinutes: durationInMinutes,
            releaseYear: releaseYear,
            criticScore: response.body.criticScore,
            audienceScore: response.body.audienceScore,
            reviews: response.body.reviews,
          });
          cy.promoteAdmin(token);
          cy.deleteUser(id, token);
        });
      });
    });
  });

  describe("Usuário admin", function () {
    it("Deve ser possível encontrar um filme por id como usuário admin", function () {
      cy.createAndLogAdmin(
        "julius",
        faker.internet.exampleEmail(),
        "everybody"
      ).then((response) => {
        token = response.token;
        id = response.id;
        cy.postReview(movieId, token);

        cy.request({
          method: "GET",
          url: "movies/" + movieId,
          auth: {
            bearer: token,
          },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal({
            id: movieId,
            title: titleMovie,
            description: descriptionMovie,
            genre: genreMovie,
            durationInMinutes: durationInMinutes,
            releaseYear: releaseYear,
            criticScore: response.body.criticScore,
            audienceScore: response.body.audienceScore,
            reviews: response.body.reviews,
          });
          cy.deleteUser(id, token);
        });
      });
    });
  });

  describe("Usuário não logado", function () {
    it("Deve ser possível encontrar um filme por id como usuário não logado", function () {
      cy.request({
        method: "GET",
        url: "movies/" + movieId,
      }).then(function (response) {
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({
          id: movieId,
          title: titleMovie,
          description: descriptionMovie,
          genre: genreMovie,
          durationInMinutes: durationInMinutes,
          releaseYear: releaseYear,
          criticScore: response.body.criticScore,
          audienceScore: response.body.audienceScore,
          reviews: response.body.reviews,
        });
      });
    });

    it("Não deve ser possível encontrar um filme com um id inválido", function () {
      let idInvalidosss = ["3.0", "3.5", "2.0", "4.2"];
      idInvalidosss.forEach(function (idInvalidosss) {
        cy.request({
          method: "GET",
          url: "movies/" + idInvalidosss,
          failOnStatusCode: false,
        }).then(function (response) {
          expect(response.status).to.equal(400);
          expect(response.body).to.deep.equal({
            message: "Validation failed (numeric string is expected)",
            error: "Bad Request",
            statusCode: 400,
          });
        });
      });
    });
  });
});
