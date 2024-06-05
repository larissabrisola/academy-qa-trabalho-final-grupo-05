import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import RegisterPage from "../pages/register.page";
const pageRegister = new RegisterPage()

Given('que o usuário está na página de cadastro', ()=>{
    cy.visit(Cypress.env('register_url'))
    cy.url().should('eq', 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/register')
})

When('preencher o formulário com nome válido', ()=>{
    pageRegister.typeName(faker.animal.bear())
})

When('preencher o formulário com email válido', ()=>{
    pageRegister.typeEmail(faker.internet.exampleEmail())
})

When('preencher o formulário com senha válida', ()=>{
    let truePassword = faker.internet.password({length: 10})
    pageRegister.typePassword(truePassword)
    pageRegister.typePasswordConfirm(truePassword)
})

When('clicar em Cadastrar', ()=>{
    pageRegister.clickButtonSave()
})

When('preencher o formulário com nome {string}', (string)=>{
    pageRegister.typeName(string)
})

When('preencher o formulário com email {string}', (string)=>{
    pageRegister.typeEmail(string)
})

When('preencher o formulário com email contendo 60 caracteres', ()=>{
    pageRegister.typeEmail(faker.string.alpha(50) + "@teste.com")
})


When('preencher o formulário com senha contendo 12 caracteres', ()=>{
    let doze = faker.internet.password({length: 12})
    pageRegister.typePassword(doze)
    pageRegister.typePasswordConfirm(doze)
})

When('preencher o formulário com senha {string}', (string)=>{
    pageRegister.typePassword(string)
})

When('preencher o formulário com email já cadastrado', ()=>{
    pageRegister.typeEmail('robinscherbatsy@gmail.com')
})
When('confirmar a senha {string}', (string)=>{
    pageRegister.typePasswordConfirm(string)
})

When('confirmar', ()=>{
    cy.intercept('POST', 'https://raromdb-3c39614e42d4.herokuapp.com/api/users', {
        statusCode: 409,
    })


    pageRegister.clickButtonSave()
})

Then('o usuário será cadastrado', ()=>{
    cy.get('#root > div > main > div > div.modal-overlay > div > div.modal-body > h3').should('contain', 'Sucesso').and('be.visible')
})


Then('o usuário não será cadastrado e receberá um aviso {string}', (string)=>{
    cy.contains(string).should('be.visible')

})