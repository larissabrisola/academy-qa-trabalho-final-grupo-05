/// <reference types="cypress" />

import { faker } from "@faker-js/faker"

describe('Cadastro de usuário', ()=>{
let randomName
let randomEmail;

    beforeEach(() => {
        randomName = faker.animal.dog();
        randomEmail = faker.internet.email();
    })

    it('Cadastro realizado com sucesso', ()=>{
        cy.createUser(faker.animal.cat(), faker.internet.email(), faker.internet.password({length: 10})).then((response)=>{
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("email");
            expect(response.body).to.have.property("name")
        })
    })

    it('Não deve ser possivel cadastrar com um email já utilizado', ()=>{
        cy.createUser(randomName, randomEmail, "linuxtips", true)
        cy.createUser(randomName, randomEmail, "aboboradoi", false).then((response) => {

            expect(response.status).to.equal(409);
            expect(response.body).to.deep.equal(
                {
                    "message": "Email already in use",
                    "error": "Conflict",
                    "statusCode": 409
                })
        })
    })
})