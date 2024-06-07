import { faker } from "@faker-js/faker";
var email;
var token;
var idFilme1
var idFilme2
var idFilme3
var idFilme4
var idFilme5


Cypress.Commands.add("createUser", function (nome, email, senha, failOnStatusCode) {
  cy.request(
    {
      method: 'POST', url: `users`,
      body: {
        "name": nome,
        "email": email,
        "password": senha
      }, failOnStatusCode: failOnStatusCode
    })
});

Cypress.Commands.add("login", function (email, senha) {
  cy.request({
    method: "POST",
    url: "auth/login",
    body: {
      email: email,
      password: senha
    }
  }).then(function (response) {
    const accessToken = response.body.accessToken
    Cypress.env('accessToken', accessToken)
  })
})

Cypress.Commands.add('promoteAdmin', function () {
  cy.request({
    method: "PATCH",
    url: 'users/admin',
    headers: {
      Authorization: `Bearer ${Cypress.env('accessToken')}`
    }
  })
})

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
      .request("POST", "auth/login", {
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

Cypress.Commands.add("deleteUser", function (id, token, failOnStatusCode) {
  cy.request({
    method: "DELETE",
    url: "users/" + id,
    headers: {
      Authorization: "Bearer " + token,
    }, failOnStatusCode: failOnStatusCode
  });
});

Cypress.Commands.add("inactivateUser", function (token) {
  cy.request({
    method: "PATCH",
    url: "users/inactivate",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

Cypress.Commands.add("createAndLogAdmin", function (nome, email, senha) {
  let uId;
  let uToken;
  cy.request("POST", "users", {
    name: nome,
    email: email,
    password: senha,
  }).then(function (response) {
    uId = response.body.id;
    return cy
      .request("POST", "auth/login", {
        email: email,
        password: senha,
      })
      .then(function (response) {
        uToken = response.body.accessToken;
        cy.request({
          method: "PATCH",
          url: "users/admin",
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
  cy.request("POST", "users", {
    name: nome,
    email: email,
    password: senha,
  }).then(function (response) {
    uId = response.body.id;
    return cy
      .request("POST", "auth/login", {
        email: email,
        password: senha,
      })
      .then(function (response) {
        uToken = response.body.accessToken;
        cy.request({
          method: "PATCH",
          url: "users/apply",
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


Cypress.Commands.add('adminCreatesAMovie', (title, genre, description, durationInMinutes, releaseYear, failOnStatusCode) => {

  cy.createAndLogAdmin(faker.animal.fish(), faker.internet.exampleEmail(), 'lionxitps').then((response) => {
    let token = response.token

    cy.request({
      method: "POST",
      url: "movies",
      headers: {
        Authorization: "Bearer " + `${token}`,
      },
      body: {
        title: title,
        genre: genre,
        description: description,
        durationInMinutes: durationInMinutes,
        releaseYear: releaseYear,
      }, failOnStatusCode
    })
  })
});










// COMMANDS DO ÉRIKO HEHEHE... 
var id;
var email;
var token;
var idFilme1
var idFilme2
var idFilme3
var idFilme4
var idFilme5

Cypress.Commands.add("newUser", function () {
  var newName = faker.person.firstName() + "ão";
  var newEmail = faker.internet.email();
  return cy
    .request({
      method: "POST",
      url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users",
      body: {
        name: newName,
        email: newEmail,
        password: "123456",
      },
    })
    .then((response) => {
      id = response.body.id;
      email = response.body.email;
    });
});

Cypress.Commands.add("promoveAdmin", function () {
  cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login",
    body: {
      email: email,
      password: "123456",
    },
  })
    .then((response) => {
      token = response.body.accessToken;
      cy.request({
        method: "PATCH",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    });
});

Cypress.Commands.add("deleteUser", function () {
  cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login",
    body: {
      email: email,
      password: "123456",
    },
  })
    .then((response) => {
      token = response.body.accessToken;
      cy.request({
        method: "PATCH",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    })
    .then((response) => {
      cy.request({
        method: "DELETE",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/" + id,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    });
});


Cypress.Commands.add("createMovies", function () {
  cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login",
    body: {
      email: email,
      password: "123456",
    },
  })
    .then((response) => {
      token = response.body.accessToken;
      cy.request({
        method: "PATCH",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    })
    .then(() => {
      cy.request({
        method: "POST",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
        body: {
          title: "Eriko",
          genre: "Tecnologia Pesada",
          description: "Estudei muito",
          durationInMinutes: 999,
          releaseYear: 2024
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
    })
    .then((response) => {
      idFilme1 = response.body.id
      cy.request({
        method: "POST",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
        body: {
          title: "Eriko Entrou",
          genre: "Tecnologia Pesada",
          description: "Estudei muito",
          durationInMinutes: 999,
          releaseYear: 2024
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
    })
    .then((response) => {
      idFilme2 = response.body.id
      cy.request({
        method: "POST",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
        body: {
          title: "Eriko Entrou na",
          genre: "Tecnologia Pesada",
          description: "Estudei muito",
          durationInMinutes: 999,
          releaseYear: 2024
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
    })
    .then((response) => {
      idFilme3 = response.body.id
      cy.request({
        method: "POST",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
        body: {
          title: "Eriko Entrou na Raro",
          genre: "Tecnologia Pesada",
          description: "Estudei muito",
          durationInMinutes: 999,
          releaseYear: 2024
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
    })
    .then((response) => {
      idFilme4 = response.body.id
      cy.request({
        method: "POST",
        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
        body: {
          title: "Eriko Entrou na Raro com sucesso",
          genre: "Tecnologia Pesada",
          description: "Estudei muito",
          durationInMinutes: 999,
          releaseYear: 2024
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
    })
    .then((response) => {
      idFilme5 = response.body.id
    });

  Cypress.Commands.add("deleteMovies", function () {
    cy.request({
      method: "POST",
      url: "https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login",
      body: {
        email: email,
        password: "123456",
      },
    })
      .then((response) => {
        token = response.body.accessToken;
        cy.request({
          method: "PATCH",
          url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      })
      .then(() => {
        cy.request({
          method: "DELETE",
          url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies/" + idFilme1,
          headers: {
            Authorization: "Bearer " + token,
          },
        })
      })
      .then(() => {
        cy.request({
          method: "DELETE",
          url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies/" + idFilme2,
          headers: {
            Authorization: "Bearer " + token,
          },
        })
      })
      .then(() => {
        cy.request({
          method: "DELETE",
          url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies/" + idFilme3,
          headers: {
            Authorization: "Bearer " + token,
          },
        })
      })
      .then(() => {
        cy.request({
          method: "DELETE",
          url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies/" + idFilme4,
          headers: {
            Authorization: "Bearer " + token,
          },
        })
      })
      .then(() => {
        cy.request({
          method: "DELETE",
          url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies/" + idFilme5,
          headers: {
            Authorization: "Bearer " + token,
          },
        })
      });
  });
});