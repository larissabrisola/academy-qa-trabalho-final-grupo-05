import { faker } from "@faker-js/faker";

Cypress.Commands.add("createUser", function (nome, email, senha, failOnStatusCode) {
  cy.request( 
    {method:'POST', url: Cypress.env('api_url') + "users",
     body: {
      "name": nome,
       "email": email,
        "password": senha
    }, failOnStatusCode: failOnStatusCode})
});

Cypress.Commands.add("login", function (email, senha) {
  cy.request({
    method: "POST",
    url:  Cypress.env('api_url') + "auth/login",
    body: {
      email: email,
      password: senha
    }
  }).then((response) => {
    const accessToken = response.body.accessToken
    Cypress.env('accessToken', accessToken)
  })
})

Cypress.Commands.add('promoteAdmin', function () {
  cy.request({
    method: 'PATCH',
    url:  Cypress.env('api_url') + 'users/admin',
    headers: {
      Authorization: `Bearer ${Cypress.env('accessToken')}`
    }
  })
})

// abrange mais testes quando recebe parametros. considerar atualizar os testes para esse comando apos todos entregarem os cards. 

Cypress.Commands.add('promoveAdmin', function (token) {
  cy.request({
    method: 'PATCH',
    url:  Cypress.env('api_url') + 'users/admin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})
Cypress.Commands.add('promoteCritic', function () {
  cy.request({
    method: 'PATCH',
    url:  Cypress.env('api_url') + 'users/apply',
    headers: {
      Authorization: `Bearer ${Cypress.env('accessToken')}`
    }
  })
})

Cypress.Commands.add("createAndLoginUser", function (nome, email, senha) {
  let uId;
  let uToken;
  cy.request("POST",  Cypress.env('api_url') + "users", {
    name: nome,
    email: email,
    password: senha,
  }).then(function (response) {
    uId = response.body.id;
    return cy
      .request("POST",  Cypress.env('api_url') + "auth/login", {
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
    url:  Cypress.env('api_url') + "users/" + id,
    headers: {
      Authorization: "Bearer " + token,
    }, failOnStatusCode: failOnStatusCode
  });
});

Cypress.Commands.add("inactivateUser", function (token) {
  cy.request({
    method: "PATCH",
    url:  Cypress.env('api_url') + "users/inactivate",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

Cypress.Commands.add("createAndLogAdmin", function (nome, email, senha) {
  let uId;
  let uToken;
  cy.request("POST",  Cypress.env('api_url') + "users", {
    name: nome,
    email: email,
    password: senha,
  }).then(function (response) {
    uId = response.body.id;
    return cy
      .request("POST",  Cypress.env('api_url') + "auth/login", {
        email: email,
        password: senha,
      })
      .then(function (response) {
        uToken = response.body.accessToken;
        cy.request({
          method: "PATCH",
          url:  Cypress.env('api_url') + "users/admin",
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
  cy.request("POST",  Cypress.env('api_url') + "users", {
    name: nome,
    email: email,
    password: senha,
  }).then(function (response) {
    uId = response.body.id;
    return cy
      .request("POST",  Cypress.env('api_url') + "auth/login", {
        email: email,
        password: senha,
      })
      .then(function (response) {
        uToken = response.body.accessToken;
        cy.request({
          method: "PATCH",
          url: Cypress.env('api_url') + "users/apply",
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

Cypress.Commands.add('adminCreatesAMovie', (title, genre, description, durationInMinutes, releaseYear, failOnStatusCode)=>{

  cy.createAndLogAdmin(faker.animal.fish(), faker.internet.exampleEmail(), 'lionxitps').then((response)=>{
    let token = response.token

    cy.request({
      method: "POST",
      url:  Cypress.env('api_url') + "movies",
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




  Cypress.Commands.add('adminCreatesALotOfMovies', function (movies, failOnStatusCode) {
    cy.createAndLogAdmin(faker.animal.fish(), faker.internet.exampleEmail(), 'lionxitps').then((response) => {
      let token = response.token
  
      movies.forEach(movie => {
        cy.request({
          method: "POST",
          url: Cypress.env('api_url') + "movies",
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            title: movie.title,
            genre: movie.genre,
            description: movie.description,
            durationInMinutes: movie.durationInMinutes,
            releaseYear: movie.releaseYear,
          }, failOnStatusCode
        })
      })
    })
  });
  