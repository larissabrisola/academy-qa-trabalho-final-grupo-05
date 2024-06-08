import { faker } from "@faker-js/faker";

describe("Testes de inativação de usuário", () => {
    let id
    let token
    beforeEach(() => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.createAndLoginUser(nome, email, "123456", true).then((data) => {
            id = data.id
            token = data.token
            Cypress.env('accessToken', token)
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
        cy.createAndLoginUser(faker.person.fullName(), faker.internet.email(), "123456", true).then((data) => {
            token = data.token
            Cypress.env('accessToken', token)
            cy.getUserViaID(id, false).then((response) => {
                expect(response.status).to.equal(403)
                expect(response.body.message).to.deep.equal("Forbidden")
                cy.inactivateUser()
            })
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
        cy.createAndLoginUser(faker.person.fullName(), faker.internet.email(), "123456", true).then((data) => {
            token = data.token
            Cypress.env('accessToken', token)
            cy.getUserViaID(id, false).then((response) => {
                expect(response.status).to.equal(403)
                expect(response.body.message).to.deep.equal("Forbidden")
                cy.inactivateUser()
            })
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
        cy.createAndLoginUser(faker.person.fullName(), faker.internet.email(), "123456", true).then((data) => {
            token = data.token
            Cypress.env('accessToken', token)
            cy.getUserViaID(id, false).then((response) => {
                expect(response.status).to.equal(403)
                expect(response.body.message).to.deep.equal("Forbidden")
                cy.inactivateUser()
            })
        })
    })
})