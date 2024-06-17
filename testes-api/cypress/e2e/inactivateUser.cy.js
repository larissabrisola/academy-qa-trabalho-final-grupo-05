import { faker } from "@faker-js/faker";

describe("Inativação de usuário", () => {
  let id;
  let token;
  let nome;
  let email;
  beforeEach(() => {
    nome = faker.person.fullName();
    email = faker.internet.email();
    cy.createAndLoginUser(nome, email, "123456", true).then((data) => {
      id = data.id;
      Cypress.env("id", id);
      token = data.token;
      Cypress.env("accessToken", token);
    });
  });

  it("Deve ser possivel um administrador inativar a conta de outro usuário", () => {
    let tokenDo;
    cy.createAndLoginUser(
      "rosa",
      faker.internet.exampleEmail(),
      "francisco"
    ).then((response) => {
      tokenDo = response.token;
    });

    cy.createAndLogAdmin(
      "rochele",
      faker.internet.exampleEmail(),
      "ofaofa"
    ).then((response) => {
      cy.request({
        method: "PATCH",
        url: "users/inactivate",
        headers: {
          Authorization: "Bearer " + tokenDo,
        },
      });
    });
  });

  it("Deve ser possível um usuário administrador inativar a própria conta", () => {
    cy.promoteAdmin(token);
    cy.request({
      method: "PATCH",
      url: "users/inactivate",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
    //confirma que o usuário foi inativado e não pode fazer login novamente
    cy.login(email, "123456", false).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.deep.equal(
        "Invalid username or password."
      );
      expect(response.body.error).to.deep.equal("Unauthorized");
    });
  });
  
  it("Deve ser possível um usuário comum inativar a própria conta", () => {
    cy.request({
      method: "PATCH",
      url: "users/inactivate",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
    //confirma que o usuário foi inativado e não pode fazer login novamente
    cy.login(email, "123456", false).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.deep.equal(
        "Invalid username or password."
      );
      expect(response.body.error).to.deep.equal("Unauthorized");
    });
  });

  it("Deve ser possível um usuário critico inativar a própria conta", () => {
    cy.promoteCritic(token);
    cy.request({
      method: "PATCH",
      url: "users/inactivate",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
    //confirma que o usuário foi inativado e não pode fazer login novamente
    cy.login(email, "123456", false).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.deep.equal(
        "Invalid username or password."
      );
      expect(response.body.error).to.deep.equal("Unauthorized");
    });
  });

  it("Deve ser possivel reutilizar o email de um usuário inativado", () => {
    //testa se o email esta em uso
    cy.createUser(faker.person.fullName(), email, "123456", false).then(
      (response) => {
        expect(response.status).to.equal(409);
        expect(response.body.message).to.deep.equal("Email already in use");
        expect(response.body.error).to.deep.equal("Conflict");
      }
    );
    cy.inactivateUser(token);
    //cria um usuário novo com o mesmo email do criado inativado
    cy.createUser(faker.person.fullName(), email, "123456", false).then(
      (response) => {
        expect(response.status).to.equal(201);
      }
    );
  });

  it("As reviews de um usuário inativado devem permanecer no sistema", () => {
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
          cy.inactivateUser(token);
        });
      });
    });
  });

  it("Não deve ser possível inativar um usuário com token incorreto", () => {
    cy.request({
      method: "PATCH",
      url: "users/inactivate",
      headers: {
        Authorization: "Bearer " + "token invalido ",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal("Access denied.");
      expect(response.body.error).to.equal("Unauthorized");
      cy.inactivateUser(token);
    });
  });

  it("Não deve ser possivel um usuário comum inativar a conta de outro usuário", () => {
    let tokenDo;
    cy.createAndLoginUser(
      "rosa",
      faker.internet.exampleEmail(),
      "francisco"
    ).then((response) => {
      tokenDo = response.token;
    });

    cy.createAndLoginUser("rochele", faker.internet.exampleEmail(), "ofaofa")
      .then((response) => {
        cy.request({
          method: "PATCH",
          url: "users/inactivate",
          headers: {
            Authorization: "Bearer " + tokenDo,
          },
        });
      })
      .then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({
            message: "Access denied.",
            error: "Unauthorized",
            statusCode: 401,
          });
      });
  });

  it("Não deve ser possivel um usuário critico inativar a conta de outro usuário", () => {
    let tokenDo;
    cy.createAndLoginUser(
      "rosa",
      faker.internet.exampleEmail(),
      "francisco"
    ).then((response) => {
      tokenDo = response.token;
    });

    cy.createAndLoginCritic("rochele", faker.internet.exampleEmail(), "ofaofa")
      .then((response) => {
        cy.request({
          method: "PATCH",
          url: "users/inactivate",
          headers: {
            Authorization: "Bearer " + tokenDo,
          },
        });
      })
      .then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({
            message: "Access denied.",
            error: "Unauthorized",
            statusCode: 401,
          });
      });
  });
});

describe("Inativação de usuário - Usuário não logado", () => {
  it("Não deve ser possivel um usuário deslogado inativar a conta de um usuário", () => {
    let tokenDo;
    cy.createAndLoginUser(
      "rosa",
      faker.internet.exampleEmail(),
      "francisco"
    ).then((response) => {
      tokenDo = response.token;
    });

    cy.request({
      method: "PATCH",
      url: "users/inactivate",
      headers: {
        Authorization: "Bearer " + tokenDo,
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
