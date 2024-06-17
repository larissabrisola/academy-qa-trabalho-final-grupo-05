import { faker } from "@faker-js/faker";

describe("Buscar filme com o usuário logado e autenticado no sistema", () => {
  let uToken;
  let filme;

  let movie = {
    title: faker.person.firstName(),
    genre: faker.person.jobArea(),
    description: faker.lorem.sentences(),
  };

  before(() => {
    cy.adminCreatesAMovie(
      movie.title,
      movie.genre,
      movie.description,
      100,
      2020
    ).then((response) => {
      filme = response.body;
    });
  });

  it("Deve ser possível encontrar um filme por meio de seu título estando logado no sistema", () => {
    cy.createAndLoginUser(
      "juju",
      faker.internet.exampleEmail(),
      "boitata"
    ).then((response) => {
      uToken = response.token;
      cy.request({
        method: "GET",
        url: "movies/search?title=" + filme.title,
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body[0]).to.include(filme);
      });
    });
  });

  it("Deve ser possível encontrar um filme por meio de seu título sem estar logado no sistema", () => {
    cy.request({
      method: "GET",
      url: "movies/search?title=" + filme.title,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body[0]).to.include(filme);
    });
  });

  it("Deve ser possível encontrar um filme inserindo dados parciais", () => {
    cy.adminCreatesAMovie(
      movie.title,
      movie.genre,
      movie.description,
      100,
      2020
    ).then((response) => {
      filme = response.body;
    });

    const parcialTitle = filme.title.slice(1, 3);
    cy.request({
      method: "GET",
      url: "movies/search?title=" + parcialTitle,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body[0].title).to.contains(parcialTitle);
    });
  });

  it("Não deve ser possível encontrar um filme deletado", () => {
    let filmin;
    cy.createAndLogAdmin(
      "asdsa",
      faker.internet.exampleEmail(),
      "aopdfopa"
    ).then((response) => {
      uToken = response.token;
      Cypress.env("accessToken", uToken);
      cy.createMovie()
        .then((response) => {
          filmin = response;
          cy.deleteMovie(filmin.id, uToken);
        })
        .then((filmin) => {
          cy.request({
            method: "GET",
            url: "movies/search?title=" + filmin.title,
            headers: {
              Authorization: `Bearer ${uToken}`,
            },
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.empty;
          });
        });
    });
  });

  it("Não deve ser possível buscar filme inserindo multiplos parâmetros", () => {
    cy.request({
      method: "GET",
      url: "movies/search?title=" + filme.title + "  " + filme.releaseYear,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).be.empty;
    });
  });

  it("Não deve ser possível buscar filme pela ID", () => {
    cy.request({
      method: "GET",
      url: "movies/search?title=" + filme.id,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).be.empty;
    });
  });
});
