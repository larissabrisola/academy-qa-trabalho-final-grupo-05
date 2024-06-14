import { faker } from "@faker-js/faker";


describe('Avaliação de Filmes', function () {
    let userName;
    let userEmail;
    let id;
    let token;

    beforeEach(() => {
        userName = faker.person.fullName();
        userEmail = faker.internet.email().toLowerCase();

        cy.createAndLoginUser(userName + 'ão', userEmail, '123456').then(function (response) {
            token = response.token
            id = response.id
            cy.log(response)
            Cypress.env('accessToken', token)

            cy.promoteAdmin(token);
            cy.createMovie().then(function (response) {
                cy.wrap(response).as('filmeCriado')
                cy.inactivateWithToken(token)
            });
        });
    });
    afterEach(function () {
        cy.inactivateWithToken(token)
    });

    it('Deve ser possível um usuário comum criar review de um filme', () => {
        cy.createAndLoginUser('Eriko', faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.get('@filmeCriado').then(function (filme) {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: {
                        movieId: filme.id,
                        score: 1,
                        reviewText: "Esta muito show de boleta",
                    },
                }).then((response) => {
                    expect(response.status).to.equal(201);
                    cy.request("GET", "movies/" + filme.id).then(function (response) {
                        expect(response.body.reviews[0].reviewText).to.deep.equal("Esta muito show de boleta")
                        expect(response.body.reviews[0].reviewType).to.equal(0)
                        expect(response.body.reviews[0].score).to.equal(1)
                        expect(response.body.reviews[0].user.type).to.equal(0)
                    });
                });
            });
        });
    });

    it('Deve ser possível um usuário critico criar review de um filme', () => {
        cy.createAndLoginUser('Janaina', faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.promoteCritic(token)
            cy.get('@filmeCriado').then(function (filme) {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: {
                        movieId: filme.id,
                        score: 4,
                        reviewText: "Pó ve que é sucesso!",
                    },
                }).then((response) => {
                    expect(response.status).to.equal(201);
                    cy.request("GET", "movies/" + filme.id).then(function (response) {
                        expect(response.body.reviews[0].reviewText).to.deep.equal("Pó ve que é sucesso!")
                        expect(response.body.reviews[0].reviewType).to.equal(1)
                        expect(response.body.reviews[0].score).to.equal(4)
                        expect(response.body.reviews[0].user.type).to.equal(2)
                    });
                });
            });
        });
    });

    it('Deve ser possível um usuário administrador criar review de um filme', function () {
        cy.createAndLoginUser('Joelma', faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.promoteAdmin(token)
            cy.get('@filmeCriado').then(function (filme) {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: {
                        movieId: filme.id,
                        score: 3,
                        reviewText: "Ahhhh... que Filme!",
                    },
                }).then((response) => {
                    expect(response.status).to.equal(201);
                    cy.request("GET", "movies/" + filme.id).then((response) => {
                        expect(response.body.reviews[0].reviewText).to.deep.equal("Ahhhh... que Filme!")
                        expect(response.body.reviews[0].reviewType).to.equal(0)
                        expect(response.body.reviews[0].score).to.equal(3)
                        expect(response.body.reviews[0].user.type).to.equal(1)
                    });
                });
            });
        });
    });

    it('Não deve ser possível um usuário não autenticado criar review de um filme', function () {
        cy.createAndLoginUser('Poliana', faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.get('@filmeCriado').then(function (filme) {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    body: {
                        movieId: filme.id,
                        score: 3,
                        reviewText: "Ahhhh... que Filme!",
                    }, failOnStatusCode: false
                }).then((response) => {
                    expect(response.body).to.deep.equal({
                        "message": "Access denied.",
                        "error": "Unauthorized",
                        "statusCode": 401
                    });
                });
            });
        });
    });

    it('Não deve ser possível um filme ter uma nota (score) 0', function () {
        cy.createAndLoginUser(faker.animal.horse(), faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.promoteAdmin(token)
            cy.get('@filmeCriado').then(function (filme) {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: {
                        movieId: filme.id,
                        score: 0,
                        reviewText: "Não gostei!",
                    }, failOnStatusCode: false
                }).then(function (response) {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.deep.equal({
                        error: "Bad Request",
                        message: "Score should be between 1 and 5",
                        statusCode: 400
                    });
                });
            });
        });
    });

    it('Não deve ser possível um filme ter uma nota (score) superior a 5', function () {
        cy.createAndLoginUser(faker.animal.horse(), faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.promoteAdmin(token)
            cy.get('@filmeCriado').then(function (filme) {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: {
                        movieId: filme.id,
                        score: 6,
                        reviewText: "Gostei demais!",
                    }, failOnStatusCode: false
                }).then(function (response) {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.deep.equal({
                        error: "Bad Request",
                        message: "Score should be between 1 and 5",
                        statusCode: 400
                    });
                });
            });
        });
    });

    it('Não deve ser possível criar review de um filme sem informar o movieId', function () {
        cy.createAndLoginUser(faker.animal.horse(), faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.get('@filmeCriado').then(function () {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: {
                        score: 6,
                        reviewText: "Gostei demais!",
                    }, failOnStatusCode: false
                }).then(function (response) {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.deep.equal({
                        "message": [
                            "movieId must be an integer number",
                            "movieId should not be empty"
                        ],
                        "error": "Bad Request",
                        "statusCode": 400
                    });
                });
            });
        });
    });

    it('Não deve ser possível criar review de um filme sem informar a nota (score) do filme', function () {
        cy.createAndLoginUser(faker.animal.horse(), faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.get('@filmeCriado').then(function (filme) {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: {
                        movieId: filme.id,
                        reviewText: "Gostei demais!",
                    }, failOnStatusCode: false
                }).then(function (response) {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.deep.equal({
                        "message": [
                            "score must be a number conforming to the specified constraints",
                            "score should not be empty"
                        ],
                        "error": "Bad Request",
                        "statusCode": 400
                    });
                });
            });
        });
    });

    it('Deve ser possível avaliar um filme sem escrever uma review', function () {
        cy.createAndLoginUser(faker.person.firstName() + "ão", faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.get('@filmeCriado').then(function (filme) {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: {
                        movieId: filme.id,
                        score: 3,
                    }
                }).then((response) => {
                    expect(response.status).to.equal(201);
                    cy.request("GET", "users/review/all").then((response) => {
                        expect(response.body.reviews[0].reviewType).to.equal(0)
                        expect(response.body.reviews[0].score).to.equal(3)
                    });
                });
            });
        });
    });

    it('Não deve ser possível escrever review de um filme informando 501 ou mais caracteres', function () {
        cy.createAndLoginUser('Janaina', faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.promoteCritic(token)
            cy.get('@filmeCriado').then(function (filme) {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: {
                        movieId: filme.id,
                        score: 4,
                        reviewText: 'Ha'.repeat(251),
                    }, failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.deep.equal({
                        "message": [
                            "reviewText must be shorter than or equal to 500 characters"
                        ],
                        "error": "Bad Request",
                        "statusCode": 400
                    });
                });
            });
        });
    });

    it('Deve ser possível escrever review de um filme informando 500 caracteres', function () {
        cy.createAndLoginUser('Janaina', faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.promoteCritic(token)
            cy.get('@filmeCriado').then(function (filme) {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: {
                        movieId: filme.id,
                        score: 4,
                        reviewText: 'Q'.repeat(500),
                    }
                }).then((response) => {
                    expect(response.status).to.equal(201);
                });
            });
        });
    });

    it('Não deve ser possível informar caracteres especiais na nota de um filme', function () {
        cy.createAndLoginUser('Joelma', faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.get('@filmeCriado').then(function (filme) {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: {
                        movieId: filme.id,
                        score: '@&%$#',
                        reviewText: "Ahhhh... que Filme!",
                    }, failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.deep.equal({
                        "message": [
                            "score must be a number conforming to the specified constraints"
                        ],
                        "error": "Bad Request",
                        "statusCode": 400
                    });
                });
            });
        });
    });

    it('Não deve ser possível criar review usando numeros decimais', function () {
        cy.createAndLoginUser(faker.animal.horse(), faker.internet.exampleEmail(), '123456').then(function (response) {
            token = response.token
            cy.promoteAdmin(token)
            cy.get('@filmeCriado').then(function (filme) {
                cy.request({
                    method: "POST",
                    url: "users/review",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: {
                        movieId: filme.id,
                        score: 2.2,
                        reviewText: "Gostei demais!",
                    }, failOnStatusCode: false
                }).then(function (response) {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.deep.equal({
                        error: "Bad Request",
                        message: "Score should be between 1 and 5",
                        statusCode: 400
                    });
                });
            });
        });
    });
});




