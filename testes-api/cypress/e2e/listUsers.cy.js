import { faker } from "@faker-js/faker";

describe("Lista de usuários", () => {
  let id;
  let token;
  let nome;
  let email;

  beforeEach(() => {
    nome = faker.person.fullName();
    email = faker.internet.email();
    cy.createAndLoginUser(nome, email, "123456", true).then((data) => {
      id = data.id;
      token = data.token;
    });
  });
  afterEach(() => {
    cy.inactivateUser(token);
  });

  it("Deve ser possível um usuário administrador acessar a lista de usuários", () => {
    cy.promoteAdmin(token);
    cy.request({
      method: "GET",
      url: "users",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("Array");
    });
  });
  it("Deve ser possível verificar informações dos usuários na lista", () => {
    cy.promoteAdmin(token);
    cy.request({
      method: "GET",
      url: "users",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      let tamanho = response.body.length - 1;
      expect(response.status).to.equal(200);
      expect(response.body[tamanho].id).to.equal(id);
      expect(response.body[tamanho].name).to.equal(nome);
      expect(response.body[tamanho].email).to.equal(email.toLowerCase());
      expect(response.body[tamanho].type).to.equal(1);
      expect(response.body[tamanho].active).to.equal(true);
    });
  });

  it("Não deve ser possível possível um usuário comum acessar a lista de usuários", () => {
    cy.request({
      method: "GET",
      url: "users",
      headers: {
        Authorization: "Bearer " + token,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(403);
      expect(response.body.message).to.equal("Forbidden");
    });
  });

  it("Não deve ser possível um usuário critico acessar a lista de usuários", () => {
    cy.promoteCritic(token);
    cy.request({
      method: "GET",
      url: "users",
      headers: {
        Authorization: "Bearer " + token,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(403);
      expect(response.body.message).to.equal("Forbidden");
    });
  });
});


describe('Lista de usuários - usuário não logado', ()=>{

    it('Não deve ser possivel um usuário deslogado acessar a lista de usuários', ()=>{
      cy.request({
        method: "GET",
        url: "users", failOnStatusCode: false
      }).then((response)=>{
        expect(response.body).to.deep.equal( {
          "message": "Access denied.",
          "error": "Unauthorized",
          "statusCode": 401
          })
      })
    })
})