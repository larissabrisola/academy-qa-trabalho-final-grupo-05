import { faker } from "@faker-js/faker";
describe("Teste promover usuário a administrador", function () {
    beforeEach(function () {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.createUser(nome, email, "123456", true)
        cy.login(email, "123456")
    })
    afterEach(function () {
        cy.inactivateUser()
    })
    it("Deve ser possível fazer a promoção com um usuário propriamente logado e autenticado", function () {
        cy.request({
            method: "PATCH",
            url: "users/admin",
            failOnStatusCode: true,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then(function (response) {
            expect(response.status).to.equal(204)
        })
    })

    it("Deve ser possível um usuário admin passar a ser um usuário critico", function () {
        cy.promoteAdmin()
        cy.request({
            method: 'PATCH',
            url: 'users/apply',
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then(function (response) {
            expect(response.status).to.equal(204)
        })
    })
})

describe("Não deve ser possível fazer a promoção sem fazer o login do usuário", function () {
    it("Não deve ser possível fazer a promoção sem fazer o login do usuário", function () {
        cy.request({
            method: "PATCH",
            url: "users/admin",
            failOnStatusCode: false
        }).then(function (response) {
            expect(response.body.statusCode).to.equal(401)
            expect(response.body.error).to.deep.equal("Unauthorized")
            expect(response.body.message).to.deep.equal("Access denied.")
        })
    })
})
