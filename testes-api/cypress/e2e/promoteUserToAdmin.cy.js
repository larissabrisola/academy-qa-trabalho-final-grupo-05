import { faker } from "@faker-js/faker";

describe("Teste promover usuário a administrador", function () {
    it("Não deve ser possível fazer a promoção sem um usuário", function () {
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
    it("Não deve ser possível fazer a promoção sem fazer o login do usuário", function () {
        cy.createUser(faker.person.fullName(), faker.internet.email(), "123456", true)
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
    it("Não deve ser possível fazer a promoção sem autenticar o usuário", function () {
        cy.createAndLoginUser(faker.person.fullName(), faker.internet.email(), "123456")
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
    it("Deve ser possível fazer a promoção com um usuário propriamente logado e autenticado", function () {
        let token
        cy.createAndLoginUser(faker.person.fullName(), faker.internet.email(), "123456").then(function (data) {
            token = data.token
            cy.request({
                method: "PATCH",
                url: "users/admin",
                failOnStatusCode: true,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(function (response) {
                expect(response.status).to.equal(204)
            })
        })
    })
})