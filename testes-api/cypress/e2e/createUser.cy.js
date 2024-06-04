/// <reference types="cypress" />

import { faker } from "@faker-js/faker"

describe('Cadastro de usuário', ()=>{

    it('Cadastro realizado com sucesso', ()=>{
        cy.createUser(faker.animal.cat(), faker.internet.exampleEmail(), faker.internet.password({length: 10})).then((response)=>{
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("email");
            expect(response.body).to.have.property("name")
            expect(response.body).to.have.deep.property('type', 0)
        })
    })

    it('Deve ser possivel cadastrar com nome contendo 100 caracteres', ()=>{
        cy.createUser('assistamJaneTheVirginMelhoreSerieassistamJaneTheVirginMelhoreSerieassistamJaneTheVirginMelhoreSerieA', faker.internet.exampleEmail(), faker.internet.password({length: 10}), true).then((response)=>{
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property("id")
            expect(response.body).to.have.property("email")
            expect(response.body).to.have.property("name")
            expect(response.body).to.have.deep.property('type', 0)
        })
    })

    it('Deve ser possivel cadastrar com email contendo 60 caracteres', ()=>{
        cy.createUser('Jane', faker.string.alpha(50) + '@teste.com', faker.internet.password({length: 10})).then((response)=>{
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property("id")
            expect(response.body).to.have.property("email")
            expect(response.body).to.have.property("name")
            expect(response.body).to.have.deep.property('type', 0)
        })
    })

    it('Deve ser possivel cadastrar com senha contendo 12 caracteres', ()=>{
        cy.createUser('Petra', faker.internet.exampleEmail(), faker.internet.password({length: 12})).then((response)=>{
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property("id")
            expect(response.body).to.have.property("email")
            expect(response.body).to.have.property("name")
            expect(response.body).to.have.deep.property('type', 0)
        })
    })

    it('Deve ser possivel cadastrar com nome contendo 1 caractere', ()=>{
        cy.createUser('A', faker.internet.exampleEmail(), faker.internet.password({length: 10}), true).then((response)=>{
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property("id")
            expect(response.body).to.have.property("email")
            expect(response.body).to.have.property("name")
            expect(response.body).to.have.deep.property('type', 0)
        })
    })

    it('Não deve ser possivel cadastrar com um email já utilizado', ()=>{
        let randomName = faker.animal.dog();
        let randomEmail = faker.internet.exampleEmail();

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

    it('Não deve ser possivel cadastrar com formato de email inválido', ()=>{
        let emailsInvalidos = ["joca@mo.", "lori🤓j@gmail.com", "lori@#s.com", "pamela@", "*****@****.***"] // emails com emoji no dominio estão sendo permitidos
        emailsInvalidos.forEach(email => {

            cy.createUser('Michael', email, 'linuxtips', false).then((response)=>{
                expect(response.body).to.deep.equal( {
                    "message": [
                    "email must be an email"
                    ],
                    "error": "Bad Request",
                    "statusCode": 400
                    })
            })
        });

    })

    it('Não deve ser possivel cadastrar com email contendo 61 ou mais caracteres', ()=>{
        cy.createUser('Michael', faker.string.alpha(50) + '@testes.com', 'linuxtips', false).then((response)=>{
            expect(response.body).to.deep.equal(  {
                "message": [
                "email must be shorter than or equal to 60 characters"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        })
    })

    it('Não deve ser possivel cadastrar com email contendo 4 ou menos caracteres', ()=>{
        cy.createUser('Michael', 'j@o.', 'linuxtips', false).then((response)=>{
            expect(response.body).to.deep.equal(  {
                "message": [
                "email must be longer than or equal to 5 characters",
                "email must be an email"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        })
    })

    it('Não deve ser possivel cadastrar com senha contendo 5 ou menos caracteres', ()=>{
        cy.createUser('Michael', faker.internet.exampleEmail(), faker.internet.password({length: 5}), false).then((response)=>{
            expect(response.body).to.deep.equal({
                "message": [
                "password must be longer than or equal to 6 characters"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        })
    })

    it('Não deve ser possivel cadastrar com senha contendo 13 ou mais caracteres', ()=>{
        cy.createUser('Michael', faker.internet.exampleEmail(), faker.internet.password({length: 13}), false).then((response)=>{
            expect(response.body).to.deep.equal({
                "message": [
                "password must be shorter than or equal to 12 characters"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        })
    })

    it('Não deve ser possivel cadastrar nome contendo 101 ou mais caracteres', ()=>{
        cy.createUser(faker.string.alpha(101), faker.internet.exampleEmail(), faker.internet.password({length: 10}), false).then((response)=>{
            expect(response.body).to.deep.equal({
                "message": [
                "name must be shorter than or equal to 100 characters"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        })
    })

    it('Não deve ser possivel cadastrar se o campo nome estiver vazio', ()=>{
        cy.createUser('', faker.internet.exampleEmail(), faker.internet.password({length: 10}), false).then((response)=>{
            expect(response.body).to.deep.equal({
                "message": [
                "name must be longer than or equal to 1 characters",
                "name should not be empty"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        })
    })

    it('Não deve ser possivel cadastrar se o campo email estiver vazio', ()=>{
        cy.createUser('Cirilo', '', faker.internet.password({length: 10}), false).then((response)=>{
            expect(response.body).to.deep.equal({
                "message": [
                    "email must be longer than or equal to 5 characters",
                    "email must be an email",
                    "email should not be empty"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        })
    })

    it('Não deve ser possivel cadastrar se o campo senha estiver vazio', ()=>{
        cy.createUser('Cirilo', faker.internet.exampleEmail(), '', false).then((response)=>{
            expect(response.body).to.deep.equal({
                "message": [
                    "password must be longer than or equal to 6 characters",
                    "password should not be empty"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        })
    })

    it('Não deve ser possivel cadastrar se todos campos estiverem vazios', ()=>{
        cy.createUser('', '', '', false).then((response)=>{
            expect(response.body).to.deep.equal({
                "message": [
                "name must be longer than or equal to 1 characters",
                "name should not be empty",
                "email must be longer than or equal to 5 characters",
                "email must be an email",
                "email should not be empty",
                "password must be longer than or equal to 6 characters",
                "password should not be empty"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        })
    })
})