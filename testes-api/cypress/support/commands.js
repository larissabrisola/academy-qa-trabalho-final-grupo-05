import { faker } from "@faker-js/faker";

Cypress.Commands.add("createUser", function (nome, email, senha, failOnStatusCode) {
  cy.request(
    {
      method: 'POST', url: "users",
      body: {
        "name": nome,
        "email": email,
        "password": senha
      }, failOnStatusCode: failOnStatusCode
    })
});

Cypress.Commands.add("login", function (email, senha, failOnStatusCode) {
  cy.request({
    method: "POST",
    url: "auth/login",
    body: {
      email: email,
      password: senha
    },
    failOnStatusCode: failOnStatusCode
  }).then((response) => {
    const accessToken = response.body.accessToken
    Cypress.env('accessToken', accessToken)
  })
})


// Cypress.Commands.add('promoteAdmin', function () {
//   cy.request({
//     method: 'PATCH',
//     url:  Cypress.env('api_url') + 'users/admin',
//     headers: {
//       Authorization: `Bearer ${Cypress.env('accessToken')}`
//     }
//   })
// })



Cypress.Commands.add('promoteCritic', function () {
  cy.request({
    method: 'PATCH',
    url: 'users/apply',
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

Cypress.Commands.add("inactivateUser", function () {
  cy.request({
    method: "PATCH",
    url: "users/inactivate",
    headers: {
      Authorization: `Bearer ${Cypress.env('accessToken')}`
    }
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

Cypress.Commands.add('getUserViaID', (id, failOnStatusCode) => {
  cy.request({
    method: "GET",
    url: "users/" + id,
    headers: {
      Authorization: `Bearer ${Cypress.env('accessToken')}`
    },
    failOnStatusCode: failOnStatusCode
  })
})

Cypress.Commands.add('createMovie', () => {
  cy.request({
    method: "POST",
    url: "movies",
    headers: {
      Authorization: `Bearer ${Cypress.env('accessToken')}`
    },
    body: {
      title: faker.person.firstName() + " o retorno",
      genre: "Terror",
      description: faker.lorem.words({ min: 6, max: 12 }),
      durationInMinutes: 120,
      releaseYear: 2000,
    },
  }).then((response) => {
    return response.body
  })
})

Cypress.Commands.add('postReview', (idFilme, token) => {
  cy.request({
    method: "POST",
    url: "users/review",
    headers: {
      Authorization: "Bearer " + token
    },
    body: {
      movieId: idFilme,
      score: 5,
      reviewText: "Teste review usuário inativado / promovido",
    },
  })
})

Cypress.Commands.add("inactivateWithToken", function (token) {
  cy.request({
    method: "PATCH",
    url: "users/inactivate",
    headers: {
      Authorization: "Bearer " + token
    }
  });
});

Cypress.Commands.add('promoteAdmin', function (token) {
  cy.request({
    method: 'PATCH',

    url: 'users/admin',
    headers: {
      Authorization: "Bearer " + token
    }
  }).then(response => Cypress.env('adminAccessToken', token))
})
Cypress.Commands.add('promoteCritic', function (token) {
  cy.request({
    method: 'PATCH',
    url: 'users/apply',
    headers: {
      Authorization: "Bearer " + token
    }
  }).then(response => Cypress.env('criticAccessToken', token))
})

Cypress.Commands.add('deleteMovie', function (id, token) {
  cy.request({
    method: 'DELETE',   
    url: 'movies/' + id,
    headers: {
      Authorization: "Bearer " + token
    }
  })
})
