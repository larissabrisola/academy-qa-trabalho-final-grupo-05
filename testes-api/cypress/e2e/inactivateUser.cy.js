import { faker } from "@faker-js/faker";

describe("Testes de inativação de usuário", () => {
    let id
    let token
    let nome = faker.person.fullName()
    let email = faker.internet.email()
    beforeEach(() => {
        cy.createAndLoginUser(nome, email, "123456", true).then((data) => {
            id = data.id
            Cypress.env('id', id)
            token = data.token
            Cypress.env('accessToken', token)
        })
    })
    it("Não deve ser possível inativar um usuário com token incorreto", () => {
        cy.request({
            method: "PATCH",
            url: "users/inactivate",
            headers: {
                Authorization: "Bearer " + "token invalido "
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal("Access denied.")
            expect(response.body.error).to.equal("Unauthorized")
            cy.inactivateUser()
        })
    })

    it("Deve ser possível inativar um usuário comum", () => {
        cy.request({
            method: "PATCH",
            url: "users/inactivate",
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            expect(response.status).to.equal(204)
        })
        //confirma que o usuário foi inativado e não pode fazer login novamente
        cy.login(email, "123456", false).then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.deep.equal("Invalid username or password.")
            expect(response.body.error).to.deep.equal("Unauthorized")
        })
    })

    it("Deve ser possível inativar um usuário admin", () => {
        cy.promoteAdmin()
        cy.request({
            method: "PATCH",
            url: "users/inactivate",
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            expect(response.status).to.equal(204)
        })
        //confirma que o usuário foi inativado e não pode fazer login novamente
        cy.login(email, "123456", false).then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.deep.equal("Invalid username or password.")
            expect(response.body.error).to.deep.equal("Unauthorized")
        })
    })

    it("Deve ser possível inativar um usuário Critico", () => {
        cy.promoteCritic()
        cy.request({
            method: "PATCH",
            url: "users/inactivate",
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            expect(response.status).to.equal(204)
        })
        //confirma que o usuário foi inativado e não pode fazer login novamente
        cy.login(email, "123456", false).then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.deep.equal("Invalid username or password.")
            expect(response.body.error).to.deep.equal("Unauthorized")
        })
    })

    it("Apos um usuário ser inativado seu email deve ficar disponível para outro cadastro", () => {
        //testa se o email esta em uso
        cy.createUser(faker.person.fullName(), email, "123456", false).then((response) => {
            expect(response.status).to.equal(409)
            expect(response.body.message).to.deep.equal("Email already in use")
            expect(response.body.error).to.deep.equal("Conflict")
        })
        cy.inactivateUser()
        //cria um usuário novo com o mesmo email do criado inativado
        cy.createUser(faker.person.fullName(), email, "123456", false).then((response) => {
            expect(response.status).to.equal(201)
        })
        //desativa o email de confirmação
        cy.login(email, "123456").then(() => { cy.inactivateUser() })
    })
    
    it("Caso um usuário ja tenha feito uma avaliação de um filme inativa-lo não exclui a avaliação", () => {
        let idMovie
        let token
        cy.promoteAdmin()
        cy.createMovie().then((data) => {
            idMovie = data.idFilme
            cy.wrap(idMovie).as("idFilme")
        })
        cy.inactivateUser()
        cy.createAndLoginUser(faker.person.fullName(), faker.internet.email(), "123456").then((data) => {
            token = data.token
            cy.get("@idFilme").then((idFilme) => { cy.postReview(idFilme, token) })
            cy.inactivateWithToken(token)
        })
        cy.createAndLoginUser(faker.person.fullName(), faker.internet.email(), "123456").then((data) => {
            token = data.token
            cy.get("@idFilme").then((idFilme) => {
                cy.request("GET", "movies/" + idFilme).then((response) => {
                    expect(response.body.reviews[0].reviewText).to.deep.equal("Teste review usuário inativado / promovido")
                    expect(response.body.reviews[0].reviewType).to.equal(0)
                    expect(response.body.reviews[0].score).to.equal(5)
                })
            })
        })
    })
})
