import { faker } from "@faker-js/faker";

describe("Atualizar Filmes", function () {
  let movieId;
  let token;
  let userId;

  beforeEach(function () {
    cy.createAndLogAdmin("Erikão", faker.internet.exampleEmail(), "123456")
      .then(function (response) {
        token = response.token;
        userId = response.id;
        Cypress.env("accessToken", token);
      })
      .then(function () {
        cy.createMovie().then(function (response) {
          movieId = response.id;
        });
      });
  });

  afterEach(function () {
    cy.deleteMovie(movieId, token);
    cy.deleteUser(userId, token);
  });

  it("Deve ser possível apenas um usuário administrador atualizar filmes", function () {
    cy.createAndLogAdmin(
      "Roger Federer",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
        body: {
          title: "Eriko na Estrada",
          genre: "Baseado em fatos reais",
          description: "O filme mostra a vida do Eriko",
          durationInMinutes: 160,
          releaseYear: 2020,
        },
      }).then(function (response) {
        expect(response.status).to.equal(204);
        cy.request({
          method: "GET",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        }).then(function (response) {
          expect(response.body).to.contain({
            title: "Eriko na Estrada",
            genre: "Baseado em fatos reais",
            description: "O filme mostra a vida do Eriko",
            durationInMinutes: 160,
            releaseYear: 2020,
          });
        });
      });
    });
  });

  it("Deve ser possível atualizar o título de um filme", function () {
    cy.createAndLogAdmin(
      "Rafael Nadal",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
        body: {
          title: "Jogos Americano",
        },
      }).then(function (response) {
        expect(response.status).to.equal(204);
        cy.request({
          method: "GET",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        }).then(function (response) {
          expect(response.body).to.contain({
            id: movieId,
            title: "Jogos Americano",
          });
        });
      });
    });
  });

  it("Deve ser possível atualizar o gênero de um filme", function () {
    cy.createAndLogAdmin(
      "Lebron James",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
        body: {
          genre: "Romance",
        },
      }).then(function (response) {
        expect(response.status).to.equal(204);
        cy.request({
          method: "GET",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        }).then(function (response) {
          expect(response.body).to.contain({
            id: movieId,
            genre: "Romance",
          });
        });
      });
    });
  });

  it("Deve ser possível atualizar a descrição de um filme", function () {
    cy.createAndLogAdmin("Curry", faker.internet.exampleEmail(), "123456").then(
      function (response) {
        token = response.token;
        cy.request({
          method: "PUT",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            description: "Baseado em fatos reais",
          },
        }).then(function (response) {
          expect(response.status).to.equal(204);
          cy.request({
            method: "GET",
            url: "movies/" + movieId,
            headers: {
              Authorization: "Bearer " + `${token}`,
            },
          }).then(function (response) {
            expect(response.body).to.contain({
              id: movieId,
              description: "Baseado em fatos reais",
            });
          });
        });
      }
    );
  });

  it("Deve ser possível atualizar a duração de um filme", function () {
    cy.createAndLogAdmin("Kaka", faker.internet.exampleEmail(), "123456").then(
      function (response) {
        token = response.token;
        cy.request({
          method: "PUT",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            durationInMinutes: 85,
          },
        }).then(function (response) {
          expect(response.status).to.equal(204);
          cy.request({
            method: "GET",
            url: "movies/" + movieId,
            headers: {
              Authorization: "Bearer " + `${token}`,
            },
          }).then(function (response) {
            expect(response.body).to.contain({
              id: movieId,
              durationInMinutes: 85,
            });
          });
        });
      }
    );
  });

  it("Deve ser possível atualizar o ano de lançamento de um filme", function () {
    cy.createAndLogAdmin(
      "Neymar Jr.",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
        body: {
          releaseYear: 2015,
        },
      }).then(function (response) {
        expect(response.status).to.equal(204);
        cy.request({
          method: "GET",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        }).then(function (response) {
          expect(response.body).to.contain({
            id: movieId,
            releaseYear: 2015,
          });
        });
      });
    });
  });

  it("Deve ser possível atualizar a descrição do filme com 500 caracteres", function () {
    let bigDescription = faker.string.alpha(500);
    cy.createAndLogAdmin("Hugo", faker.internet.exampleEmail(), "123456").then(
      function (response) {
        token = response.token;
        cy.request({
          method: "PUT",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            description: bigDescription,
          },
        }).then(function (response) {
          expect(response.status).to.equal(204);
          cy.request({
            method: "GET",
            url: "movies/" + movieId,
            headers: {
              Authorization: "Bearer " + `${token}`,
            },
          }).then(function (response) {
            expect(response.body).to.contain({
              id: movieId,
              description: bigDescription,
            });
          });
        });
      }
    );
  });
  it("Deve ser possível atualizar o título do filme com 100 caracteres", function () {
    let bigTitle = faker.string.alpha(100);
    cy.createAndLogAdmin("Messi", faker.internet.exampleEmail(), "123456").then(
      function (response) {
        token = response.token;
        cy.request({
          method: "PUT",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            title: bigTitle,
          },
        }).then(function (response) {
          expect(response.status).to.equal(204);
          cy.request({
            method: "GET",
            url: "movies/" + movieId,
            headers: {
              Authorization: "Bearer " + `${token}`,
            },
          }).then(function (response) {
            expect(response.body).to.contain({
              id: movieId,
              title: bigTitle,
            });
          });
        });
      }
    );
  });

  it("Deve ser possível atualizar o gênero do filme com 100 caracteres", function () {
    let bigGenre = faker.string.alpha(100);
    cy.createAndLogAdmin("Ramon", faker.internet.exampleEmail(), "123456").then(
      function (response) {
        token = response.token;
        cy.request({
          method: "PUT",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            genre: bigGenre,
          },
        }).then(function (response) {
          expect(response.status).to.equal(204);
          cy.request({
            method: "GET",
            url: "movies/" + movieId,
            headers: {
              Authorization: "Bearer " + `${token}`,
            },
          }).then(function (response) {
            expect(response.body).to.contain({
              id: movieId,
              genre: bigGenre,
            });
          });
        });
      }
    );
  });

  it("Deve ser possível atualizar o ano de lançamento do filme entre 1985 ao ano atual", function () {
    let releaseYearFirstMovie = 1895;
    cy.createAndLogAdmin(
      "Erikão",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
        body: {
          releaseYear: releaseYearFirstMovie,
        },
      }).then(function (response) {
        expect(response.status).to.equal(204);
        cy.request({
          method: "GET",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        }).then(function (response) {
          expect(response.body).to.contain({
            id: movieId,
            releaseYear: releaseYearFirstMovie,
          });
        });
      });
    });
  });

  it("Deve ser possivel atualizar um filme informando a duração de 1 minuto", function () {
    let duration = 1;
    cy.createAndLogAdmin(
      "Tomas Shelby",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
        body: {
          durationInMinutes: duration,
        },
      }).then(function (response) {
        expect(response.status).to.equal(204);
        cy.request({
          method: "GET",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        }).then(function (response) {
          expect(response.body).to.contain({
            id: movieId,
            durationInMinutes: duration,
          });
        });
      });
    });
  });

  it("Deve ser possivel atualizar um filme informando a duração de 720 horas (43200 minutos)", function () {
    let longDuration = 43200;
    cy.createAndLogAdmin(
      "Fernando",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
        body: {
          durationInMinutes: longDuration,
        },
      }).then(function (response) {
        expect(response.status).to.equal(204);
        cy.request({
          method: "GET",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        }).then(function (response) {
          expect(response.body).to.contain({
            id: movieId,
            durationInMinutes: longDuration,
          });
        });
      });
    });
  });

  it("Não deve ser possível um usuário comum atualizar filmes", function () {
    cy.createAndLoginUser(
      "Ronaldinho Gaucho",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      let token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: `Berear ${token}`,
        },
        body: {
          title: "Cabeça de Laranja",
          genre: "Comédia",
          description: "As laranjas são boas ?",
          durationInMinutes: 20,
          releaseYear: 2000,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({
          message: "Access denied.",
          error: "Unauthorized",
          statusCode: 401,
        });
      });
    });
  });

  it("Não deve ser possível um usuário critico atualizar filmes", function () {
    cy.createAndLoginCritic(
      "Michael Jordan",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      let token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: `${token}`,
        },
        body: {
          title: "Flake",
          genre: "Terror",
          description: "O caçador de humanos",
          durationInMinutes: 20,
          releaseYear: 2001,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({
          message: "Access denied.",
          error: "Unauthorized",
          statusCode: 401,
        });
      });
    });
  });

  it("Não deve ser possível atualizar a descrição do filme com mais de 500 caracteres", function () {
    let bigDescription = faker.string.alpha(501);
    cy.createAndLogAdmin("Bolt", faker.internet.exampleEmail(), "123456").then(
      function (response) {
        token = response.token;
        cy.request({
          method: "PUT",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            description: bigDescription,
          },
          failOnStatusCode: false,
        }).then(function (response) {
          expect(response.status).to.equal(400);
          expect(response.body).to.deep.equal({
            message: [
              "description must be shorter than or equal to 500 characters",
            ],
            error: "Bad Request",
            statusCode: 400,
          });
        });
      }
    );
  });

  it("Não deve ser possível atualizar o título do filme com mais de 100 caracteres", function () {
    let bigTitle = faker.string.alpha(101);
    cy.createAndLogAdmin(
      "Marcos Massi",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
        body: {
          title: bigTitle,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({
          message: ["title must be shorter than or equal to 100 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
  });

  it("Não deve ser possível atualizar o gênero do filme com mais de 100 caracteres", function () {
    let bigGenre = faker.string.alpha(101);
    cy.createAndLogAdmin(
      "Rodrigo",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
        body: {
          genre: bigGenre,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({
          message: ["genre must be shorter than or equal to 100 characters"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
  });

  it("Não deve ser possível atualizar o ano de lançamento do filme anterior a 1985", function () {
    let releaseYearFirstMovie = 1894;
    cy.createAndLogAdmin("Sena", faker.internet.exampleEmail(), "123456").then(
      function (response) {
        token = response.token;
        cy.request({
          method: "PUT",
          url: "movies/" + movieId,
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            releaseYear: releaseYearFirstMovie,
          },
          failOnStatusCode: false,
        }).then(function (response) {
          expect(response.status).to.equal(400);
          expect(response.body).to.deep.equal({
            message: ["releaseYear must not be less than 1895"],
            error: "Bad Request",
            statusCode: 400,
          });
        });
      }
    );
  });

  it("Não deve ser possível atualizar um filme informando a duração de menos de 1 minuto", function () {
    let duration = 0.59;
    cy.createAndLogAdmin(
      "Arthur Shelby",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
        body: {
          durationInMinutes: duration,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({
          message: [
            "durationInMinutes must not be less than 1",
            "durationInMinutes must be an integer number",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
  });

  it("Não deve ser possível atualizar um filme informando a duração de mais de 720.01 horas (43201 minutos)", function () {
    let longDuration = 43201;
    cy.createAndLogAdmin(
      "Rick Martin",
      faker.internet.exampleEmail(),
      "123456"
    ).then(function (response) {
      token = response.token;
      cy.request({
        method: "PUT",
        url: "movies/" + movieId,
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
        body: {
          durationInMinutes: longDuration,
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({
          message: ["durationInMinutes must not be greater than 43200"],
          error: "Bad Request",
          statusCode: 400,
        });
      });
    });
  });
});
