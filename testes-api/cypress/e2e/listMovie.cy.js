import { faker } from "@faker-js/faker";

describe("Lista de filmes", function () {
  let userName;
  let userEmail;
  let password;
  let uId;
  let uToken;

  before(() => {
    userName = faker.person.fullName();
    userEmail = faker.internet.email().toLowerCase();
    password = faker.internet.password({ length: 10 });

    cy.createUser(userName, userEmail, password).then((response) => {
      uId = response.body.id;
    });
    cy.login(userEmail, password).then((response) => {
      uToken = response.body.accessToken;
    });

    cy.adminCreatesAMovie(
      "Laissa a Princesa do Grupo 5",
      "Ação",
      "Ela é nota dez",
      180,
      2024
    );
  });

  after(() => {
    cy.promoteAdmin(uToken);
    cy.deleteUser(uId, uToken);
  });

  it("Deve ser possível um usuário logado fazer uma consulta de filmes", function () {
    cy.request({
      method: "GET",
      url: "movies",
      auth: {
        bearer: uToken,
      },
    }).then(function (response) {
      var listaDeFilmes = response.body.length;
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("Array");
      expect(response.body).to.have.length(listaDeFilmes);
    });
  });

  it("Deve ser possível um usuário não logado fazer a consulta de filmes", function () {
    cy.request({
      method: "GET",
      url: "movies",
    }).then(function (response) {
      var listaDeFilmes = response.body.length;
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("Array");
      expect(response.body).to.have.length(listaDeFilmes);
    });
  });

  it("Deve ser possível verificar todas as informações de um filme contido na lista", function () {
    let title = faker.person.firstName() + "ão" + " O filme";
    let genre = faker.person.firstName() + " Ação";
    let description = faker.lorem.words({ min: 8, max: 10 });

    cy.adminCreatesAMovie(title, genre, description, 180, 2024, "true");
    cy.request({
      method: "GET",
      url: "movies",
    }).then(function (response) {
      expect(response.status).to.equal(200);
      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("title");
      expect(response.body[0]).to.have.property("genre");
      expect(response.body[0]).to.have.property("description");
      expect(response.body[0]).to.have.property("durationInMinutes");
      expect(response.body[0]).to.have.property("releaseYear");
    });
  });
});
