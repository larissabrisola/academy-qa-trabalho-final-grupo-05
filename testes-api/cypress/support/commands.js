import { faker } from "@faker-js/faker";
Cypress.Commands.add("createUser", function (nome, email, senha) {
  let uId;
  cy.request("POST", "users", {
    name: nome,
    email: email,
    password: senha,
  })
    .then(function (response) {
      uId = response.body.id;
    })
    .then(function () {
      return {
        id: uId,
      };
    });
});

Cypress.Commands.add("createAndLoginUser", function (nome, email, senha) {
  let uId;
  let uToken;
  cy.request("POST", "/users", {
    name: nome,
    email: email,
    password: senha,
  }).then(function (response) {
    uId = response.body.id;
    return cy
      .request("POST", "/auth/login", {
        email: email,
        password: senha,
      })
      .then(function (response) {
        uToken = response.body.accessToken;
        {
          return {
            id: uId,
            token: uToken,
          };
        }
      });
  });
});

Cypress.Commands.add("deleteUser", function (id, token) {
  cy.log("Deletando o usuario");
  cy.request({
    method: "DELETE",
    url: "/users/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

Cypress.Commands.add("inactivateUser", function (token) {
  cy.request({
    method: "PATCH",
    url: "/users/inactivate",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

Cypress.Commands.add("createAndLogAdmin", function (nome, email, senha) {
  let uId;
  let uToken;
  cy.log("Cria um usuario, faz o login e da permissão de ADM ");
  cy.request("POST", "/users", {
    name: nome,
    email: email,
    password: senha,
  }).then(function (response) {
    uId = response.body.id;
    return cy
      .request("POST", "/auth/login", {
        email: email,
        password: senha,
      })
      .then(function (response) {
        uToken = response.body.accessToken;
        cy.request({
          method: "PATCH",
          url: "/users/admin",
          headers: {
            Authorization: "Bearer " + uToken,
          },
        }).then(function () {
          return {
            token: uToken,
            id: uId,
          };
        });
      });
  });
});

Cypress.Commands.add("createAndLoginCritic", function (nome, email, senha) {
  let uId;
  let uToken;
  cy.request("POST", "/users", {
    name: nome,
    email: email,
    password: senha,
  }).then(function (response) {
    uId = response.body.id;
    return cy
      .request("POST", "/auth/login", {
        email: email,
        password: senha,
      })
      .then(function (response) {
        uToken = response.body.accessToken;
        cy.request({
          method: "PATCH",
          url: "/users/apply",
          headers: {
            Authorization: "Bearer " + uToken,
          },
        }).then(function () {
          return {
            id: uId,
            token: uToken,
          };
        });
      });
  });
});
