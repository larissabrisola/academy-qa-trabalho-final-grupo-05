import { faker } from "@faker-js/faker";
describe("Teste promover usuário a administrador", () => {
    beforeEach(() => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.createUser(nome, email, "123456", true)
        cy.login(email, "123456")
    })
    afterEach(() => {
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
        }).then((response) => {
            expect(response.status).to.equal(204)
        })
    })

    it("Deve ser possível um usuário admin passar a ser um usuário critico", () => {
        cy.promoteAdmin()
        cy.request({
            method: 'PATCH',
            url: 'users/apply',
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then((response) => {
            expect(response.status).to.equal(204)
        })
    })
})

describe("Não deve ser possível fazer a promoção sem fazer o login do usuário", () => {
    it("Não deve ser possível fazer a promoção sem fazer o login do usuário", () => {
        cy.request({
            method: "PATCH",
            url: "users/admin",
            failOnStatusCode: false
        }).then((response) => {
            expect(response.body.statusCode).to.equal(401)
            expect(response.body.error).to.deep.equal("Unauthorized")
            expect(response.body.message).to.deep.equal("Access denied.")
        })
    })
})
