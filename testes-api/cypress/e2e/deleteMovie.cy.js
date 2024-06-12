import { faker } from "@faker-js/faker"

describe('Deletar filme', () => {
    const user = createUser()
    const usuarioAdmin = createUser()
    const usuarioCritico = createUser()

    let usuarioCriado
    let usuarioAdminCriado
    let usuarioCriticoCriado
    let usuarioAdminToken

    before(() => {
        cy.createUser(user.nome, user.email, user.senha, true)
            .then(response => usuarioCriado = response.body)
        cy.createUser(usuarioAdmin.nome, usuarioAdmin.email, usuarioAdmin.senha, true)
            .then(response => usuarioAdminCriado = response.body)
        cy.createUser(usuarioCritico.nome, usuarioCritico.email, usuarioCritico.senha, true)
            .then(response => usuarioCriticoCriado = response.body)

        cy.login(user.email, user.senha, true)
        cy.login(usuarioAdmin.email, usuarioAdmin.senha, true).then((response) => {
            usuarioAdminToken = response.body.accessToken
            cy.promoteAdmin(usuarioAdminToken)
        })
        cy.login(usuarioCritico.email, usuarioCritico.senha, true).then((response) => {
            cy.promoteCritic(response.body.accessToken)
        })

    })

    beforeEach(() => {
        cy.wrap(usuarioCriado).as('usuarioCriado')
        cy.wrap(usuarioAdminCriado).as('usuarioAdminCriado')
        cy.wrap(usuarioCriticoCriado).as('usuarioCriticoCriado')
        cy.createMovie().then((body) => cy.wrap(body).as('filmeCriado'))
    })

    after(() => {
        cy.deleteUser(usuarioCriado.id, usuarioAdminToken)
        cy.deleteUser(usuarioCriticoCriado.id, usuarioAdminToken)
        cy.deleteUser(usuarioAdminCriado.id, usuarioAdminToken)
    })

    it('Deve ser retornado status 204 e body vazio ao deletar um filme com sucesso', () => {
        cy.get('@filmeCriado').then((filme) => {
            cy.deleteMovie(filme.id, Cypress.env('adminAccessToken')).then((response) => {
                expect(response.status).to.equal(204)
                expect(response.body).to.be.empty
                cy.request({
                    method: "GET",
                    url: `movies/${filme.id}`
                }).then((response) => {
                    expect(response.body).is.empty
                })
            })
        })
    })

    it('Deve ser retornado status 401 caso seja passado um token inválido ao tentar deletar um filme', () => {
        cy.get('@filmeCriado').then((filme) => {
            cy.deleteMovie(filme.id, '', false).then((response) => {
                expect(response.status).to.equal(401)
                expect(response.body.message).to.equal("Access denied.")
                expect(response.body.error).to.equal("Unauthorized")
                expect(response.body.statusCode).to.equal(401)
                expect(response.body.statusCode).to.equal(response.status)
                cy.request({
                    method: "GET",
                    url: `movies/${filme.id}`
                }).then((response) => {
                    expect(response.body).is.not.empty
                    expect(response.body).includes(filme)
                })
            })
        })
    })

    it('Deve ser retornado status 403 caso um usuario comum tente deletar um filme', () => {
        cy.get('@filmeCriado').then((filme) => {
            cy.deleteMovie(filme.id, Cypress.env('accessToken'), false).then((response) => {
                expect(response.status).to.equal(403)
                expect(response.body.message).to.equal("Forbidden")
                expect(response.body.statusCode).to.equal(403)
                expect(response.body.statusCode).to.equal(response.status)
                cy.request({
                    method: "GET",
                    url: `movies/${filme.id}`
                }).then((response) => {
                    expect(response.body).is.not.empty
                    expect(response.body).includes(filme)
                })
            })
        })
    })

    it('Deve ser retornado status 403 caso um usuario critico tente deletar um filme', () => {
        cy.get('@filmeCriado').then((filme) => {
            cy.deleteMovie(filme.id, Cypress.env('criticAccessToken'), false).then((response) => {
                expect(response.status).to.equal(403)
                expect(response.body.message).to.equal("Forbidden")
                expect(response.body.statusCode).to.equal(403)
                expect(response.body.statusCode).to.equal(response.status)
                cy.request({
                    method: "GET",
                    url: `movies/${filme.id}`
                }).then((response) => {
                    expect(response.body).is.not.empty
                    expect(response.body).includes(filme)
                })
            })
        })
    })

    it('Não deve ser possivel deletar um filme passando seu titulo como parametro', () => {
        cy.get('@filmeCriado').then((filme) => {
            cy.deleteMovie(filme.title, Cypress.env('adminAccessToken'), false).then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.contains("Validation failed")
                expect(response.body.error).to.equal("Bad Request")
                expect(response.body.statusCode).to.equal(400)
                expect(response.body.statusCode).to.equal(response.status)
                cy.request({
                    method: "GET",
                    url: `movies/${filme.id}`
                }).then((response) => {
                    expect(response.body).is.not.empty
                    expect(response.body).includes(filme)
                })
            })
        })
    })

    it('Não deve ser possivel deletar um filme passando seu genero como parametro', () => {
        cy.get('@filmeCriado').then((filme) => {
            cy.deleteMovie(filme.genre, Cypress.env('adminAccessToken'), false).then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.contains("Validation failed")
                expect(response.body.error).to.equal("Bad Request")
                expect(response.body.statusCode).to.equal(400)
                expect(response.body.statusCode).to.equal(response.status)
                cy.request({
                    method: "GET",
                    url: `movies/${filme.id}`
                }).then((response) => {
                    expect(response.body).is.not.empty
                    expect(response.body).includes(filme)
                })
            })
        })
    })

    it('Não deve ser possivel deletar um filme passando sua descricao como parametro', () => {
        cy.get('@filmeCriado').then((filme) => {
            cy.deleteMovie(filme.description, Cypress.env('adminAccessToken'), false).then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.contains("Validation failed")
                expect(response.body.error).to.equal("Bad Request")
                expect(response.body.statusCode).to.equal(400)
                expect(response.body.statusCode).to.equal(response.status)
                cy.request({
                    method: "GET",
                    url: `movies/${filme.id}`
                }).then((response) => {
                    expect(response.body).is.not.empty
                    expect(response.body).includes(filme)
                })
            })
        })
    })
})

function createUser() {
    return {
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        senha: faker.internet.password({ length: 7 })
    }
}