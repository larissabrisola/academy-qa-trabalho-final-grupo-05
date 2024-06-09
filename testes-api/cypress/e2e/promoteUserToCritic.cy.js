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
    it("Caso um usuário ja tenha uma review feita anteriormente apos a promoção a review não deve ser alterada", () => {
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
            Cypress.env('accessToken', token)
            cy.get("@idFilme").then((idFilme) => { cy.postReview(idFilme, token) })
            cy.promoteCriticWithToken(token)
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