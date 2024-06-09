import { faker } from "@faker-js/faker";
describe("Teste promover usuário a crítico", () => {
    beforeEach(() => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.createUser(nome, email, "123456", true)
        cy.login(email, "123456")
    })
    afterEach(() => {
        cy.inactivateUser()
    })
    it("Deve ser possível fazer a promoção para crítico com um usuário propriamente logado e autenticado", () => {
        cy.request({
            method: "PATCH",
            url: "users/apply",
            failOnStatusCode: true,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then((response) => {
            expect(response.status).to.equal(204)
        })
    })

    it("Deve ser possível um usuário crítico passar a ser um usuário admin", () => {
        cy.promoteCritic()
        cy.request({
            method: 'PATCH',
            url: 'users/admin',
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then((response) => {
            expect(response.status).to.equal(204)
        })
    })
    it("A review anterior não deve ser alterada após a promoção do usuário a critic", () => {
        let token
        cy.promoteAdmin()
        cy.createMovie().then((response) => {
            cy.wrap(response).as("data")
        })
        cy.inactivateUser()
        cy.createAndLoginUser(faker.person.fullName(), faker.internet.email(), "123456").then((data) => {
            token = data.token
            cy.get("@data").then((data) => { cy.postReview(data.id, token) })
            cy.promoteCriticWithToken(token)
        })
        cy.createAndLoginUser(faker.person.fullName(), faker.internet.email(), "123456").then((data) => {
            token = data.token
            cy.get("@data").then((data) => {
                cy.request("GET", "movies/" + data.id).then((response) => {
                    expect(response.body.reviews[0].reviewText).to.deep.equal("Teste review usuário inativado / promovido")
                    expect(response.body.reviews[0].reviewType).to.equal(0)
                    expect(response.body.reviews[0].score).to.equal(5)
                    Cypress.env('accessToken', token)
                })
            })
        })
    })
})
describe("Não deve ser possível fazer a promoção para crítico sem fazer o login do usuário", () => {
    it("Não deve ser possível fazer a promoção para crítico sem fazer o login do usuário", () => {
        cy.request({
            method: "PATCH",
            url: "users/apply",
            failOnStatusCode: false
        }).then((response) => {
            expect(response.body.statusCode).to.equal(401)
            expect(response.body.error).to.deep.equal("Unauthorized")
            expect(response.body.message).to.deep.equal("Access denied.")
        })
    })
})
