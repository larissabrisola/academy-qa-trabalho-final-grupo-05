import { faker } from "@faker-js/faker";
describe("Promover usuário", () => {

    let token 
    let nome 
    let email 

    beforeEach(() => {
         nome = faker.person.fullName()
         email = faker.internet.email()
        cy.createAndLoginUser(nome, email, "123456", true).then((response)=>{
            token = response.token
            Cypress.env('accessToken', token)
        })
        
    })

    afterEach(() => {
        cy.inactivateUser(token)
    })
    
    it("Deve ser possivel promover a si mesmo como administrador", function () {
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

    it("Deve ser possível um usuário admin se tornar critico", () => {
        cy.promoteAdmin(token)
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


describe("Promover usuário - usuário não logado", () => {
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
