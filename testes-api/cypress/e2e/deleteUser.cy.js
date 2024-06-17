import { faker } from "@faker-js/faker";

describe("Deletar conta", () => {
  let userId;
  let token;

  it("Administrador deve ser capaz de excluir a própria conta", () => {
    cy.createAndLogAdmin(
      "Doctor Who",
      faker.internet.exampleEmail(),
      "caocovarde"
    ).then((response) => {
      userId = response.id;
      token = response.token;
      cy.deleteUser(userId, token).then((response) => {
        expect(response.status).to.equal(204);
      });
    });
  });

  it("Administrador deve ser capaz de excluir a conta de qualquer usuário", () => {
    cy.createUser("Joelma", faker.internet.exampleEmail(), "dancarcurtir").then(
      (response) => {
        userId = response.body.id;
      }
    );

    cy.createAndLogAdmin(
      "Doctor",
      faker.internet.exampleEmail(),
      "caocovarde"
    ).then((response) => {
      token = response.token;
      cy.deleteUser(userId, token).then((response) => {
        expect(response.status).to.equal(204);
        // verificando se o usuário não é listado apos a exclusão
        cy.request({
          method: "GET",
          url: "/users/" + userId,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          expect(response).to.not.have.property("id");
          expect(response).to.not.have.property("email");
          expect(response).to.not.have.property("name");
        });
      });
    });
  });

  it("Usuário comum não deve conseguir excluir a própria conta", () => {
    cy.createAndLoginUser(
      "Capitao Holt",
      faker.internet.exampleEmail(),
      "lovecheddar"
    ).then((response) => {
      userId = response.id;
      token = response.token;
      cy.deleteUser(userId, "Bearer" + token, false).then((response) => {
        expect(response.body).to.deep.equal({
          message: "Access denied.",
          error: "Unauthorized",
          statusCode: 401,
        });
      });
    });
  });

  it("Usuário critico não deve conseguir excluir a própria conta", () => {
    cy.createAndLoginCritic(
      "lucasfresno",
      faker.internet.exampleEmail(),
      "frioempoa"
    ).then((response) => {
      userId = response.id;
      token = response.token;
      cy.deleteUser(userId, "Bearer" + token, false).then((response) => {
        expect(response.body).to.deep.equal({
          message: "Access denied.",
          error: "Unauthorized",
          statusCode: 401,
        });
      });
    });
  });

  it("Usuário comum não deve conseguir excluir conta de outro usuário", () => {
    cy.createAndLoginUser(
      "Erika Hilton",
      faker.internet.exampleEmail(),
      faker.internet.password({ length: 10 })
    ).then((response) => {
      token = response.token;
      cy.deleteUser(userId, "Bearer" + token, false).then((response) => {
        expect(response.body).to.deep.equal({
          message: "Access denied.",
          error: "Unauthorized",
          statusCode: 401,
        });
      });
    });
  });

  it("Usuário critico não deve conseguir excluir conta de outro usuário", () => {
    cy.createAndLoginCritic(
      "Urias",
      faker.internet.exampleEmail(),
      faker.internet.password({ length: 10 })
    ).then((response) => {
      token = response.token;
      cy.deleteUser(userId, "Bearer" + token, false).then((response) => {
        expect(response.body).to.deep.equal({
          message: "Access denied.",
          error: "Unauthorized",
          statusCode: 401,
        });
      });
    });
  });
});
