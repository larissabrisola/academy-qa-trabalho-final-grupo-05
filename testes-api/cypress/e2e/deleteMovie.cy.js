import { faker } from "@faker-js/faker";

describe("Deletar filme", () => {
  let filme;

  let uId;
  let adminId;
  let criticId;

  let uToken;
  let adminToken;
  let criticToken;
  beforeEach(() => {
    cy.adminCreatesAMovie(
      faker.person.firstName() + "e os duendes",
      faker.music.songName(),
      faker.lorem.sentences(),
      100,
      2020
    ).then((response) => {
      filme = response.body;
    });
  });

  afterEach(() => {
    cy.deleteMovie(filme.id, adminToken);
  });

  it("Deve ser possível deletar um filme como usuário do tipo admin", () => {
    cy.createAndLogAdmin(
      faker.person.fullName(),
      faker.internet.exampleEmail(),
      "linuxtips"
    ).then((response) => {
      adminId = response.id;
      adminToken = response.token;
      cy.deleteMovie(filme.id, adminToken).then((response) => {
        expect(response.status).to.equal(204);
        expect(response.body).to.be.empty;
        cy.request({
          method: "GET",
          url: `movies/${filme.id}`,
        }).then((response) => {
          expect(response.body).is.empty;
        });
      });
    });
  });

  it("Não deve ser possível deletar um filme informando token inválido", () => {
    cy.createAndLogAdmin(
      faker.person.fullName() + "e os duendes",
      faker.internet.exampleEmail(),
      "linuxtips"
    ).then((response) => {
      adminId = response.id;
      adminToken = response.token;
      cy.deleteMovie(filme.id, "", false).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal("Access denied.");
        expect(response.body.error).to.equal("Unauthorized");
        expect(response.body.statusCode).to.equal(response.status);
        cy.request({
          method: "GET",
          url: `movies/${filme.id}`,
        }).then((response) => {
          expect(response.body).is.not.empty;
          expect(response.body).includes(filme);
        });
      });
    });
  });

  it("Não deve ser possível deletar filme como um usuário do tipo comum", () => {
    cy.createAndLoginUser(
      faker.person.fullName(),
      faker.internet.exampleEmail(),
      "linuxtips"
    ).then((response) => {
      uId = response.id;
      uToken = response.token;
      cy.deleteMovie(filme.id, uToken, false).then((response) => {
        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal("Forbidden");
        expect(response.body.statusCode).to.equal(response.status);
        cy.request({
          method: "GET",
          url: `movies/${filme.id}`,
        }).then((response) => {
          expect(response.body).is.not.empty;
          expect(response.body).includes(filme);
        });
      });
    });
  });

  it("Não deve ser possível deletar filme como um usuário do tipo crítico", () => {
    cy.createAndLoginCritic(
      faker.person.fullName(),
      faker.internet.exampleEmail(),
      "linuxtips"
    ).then((response) => {
      criticId = response.id;
      criticToken = response.token;
      cy.deleteMovie(filme.id, criticToken, false).then((response) => {
        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal("Forbidden");
        expect(response.body.statusCode).to.equal(response.status);
        cy.request({
          method: "GET",
          url: `movies/${filme.id}`,
        }).then((response) => {
          expect(response.body).is.not.empty;
          expect(response.body).includes(filme);
        });
      });
    });
  });

  it("Não deve ser possível deletar um filme passando seu título como parâmetro", () => {
    cy.createAndLogAdmin(
      faker.person.fullName(),
      faker.internet.exampleEmail(),
      "linuxtips"
    ).then((response) => {
      adminId = response.id;
      adminToken = response.token;
      cy.deleteMovie(filme.title, adminToken, false).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.contains("Validation failed");
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.statusCode).to.equal(response.status);
        cy.request({
          method: "GET",
          url: `movies/${filme.id}`,
        }).then((response) => {
          expect(response.body).is.not.empty;
          expect(response.body).includes(filme);
        });
      });
    });
  });

  it("Não deve ser possível deletar um filme passando seu gênero como parâmetro", () => {
    cy.createAndLogAdmin(
      faker.person.fullName(),
      faker.internet.exampleEmail(),
      "linuxtips"
    ).then((response) => {
      adminId = response.id;
      adminToken = response.token;
      cy.deleteMovie(filme.genre, adminToken, false).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.contains("Validation failed");
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.statusCode).to.equal(response.status);
        cy.request({
          method: "GET",
          url: `movies/${filme.id}`,
        }).then((response) => {
          expect(response.body).is.not.empty;
          expect(response.body).includes(filme);
        });
      });
    });
  });

  it("Não deve ser possível deletar um filme passando sua descrição como parâmetro", () => {
    cy.createAndLogAdmin(
      faker.person.fullName(),
      faker.internet.exampleEmail(),
      "linuxtips"
    ).then((response) => {
      adminId = response.id;
      adminToken = response.token;
      cy.deleteMovie(filme.description, adminToken, false).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.contains("Validation failed");
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.statusCode).to.equal(response.status);
        cy.request({
          method: "GET",
          url: `movies/${filme.id}`,
        }).then((response) => {
          expect(response.body).is.not.empty;
          expect(response.body).includes(filme);
        });
      });
    });
  });
});
