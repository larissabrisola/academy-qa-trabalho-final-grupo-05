import { Given, When, Then, AfterAll } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import LoginPage from "../pages/login.page";
const pageLogin = new LoginPage()


let existsEmail
let correctPassword = 'umdoistres'

let id
let token 

before(()=>{
    cy.createUser(faker.animal.insect(), faker.internet.exampleEmail(), correctPassword, false).then((response)=>{
        existsEmail = response.body.email 
        id = response.body.id
    })
})

after(()=>{
    cy.login(existsEmail, correctPassword).then((response)=>{  
        token = response.body.accessToken
        cy.promoteAdmin().then(()=>{
        cy.deleteUser(id, token, true)
    })})

})

Given('usuário está na tela de login', ()=>{
    cy.visit(Cypress.env('login_url'))
    cy.url().should('eq', "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login")
    
})

When('informar email cadastrado', ()=>{
    pageLogin.typeEmail(existsEmail)
})

When('informar o email {string}', (string)=>{
    pageLogin.typeEmail(string)
})


When('preencher a senha corretamente', ()=>{
    pageLogin.typePassword(correctPassword)
})



When('clicar em Login', ()=>{
    pageLogin.clickButtonLogin()
})

Then('o login é realizado com sucesso', ()=>{
    cy.url().should('eq', 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/')

})


When('preencher a senha {string}', (string)=>{
    pageLogin.typePassword(string)
})

Then('o login não é realizado e uma mensagem deve ser exibida {string}', (string)=>{
    cy.contains(string).should('be.visible')
})

Then('o login não é realizado e a mensagem "Falha ao autenticar. Usuário ou senha inválidos." é exibida', ()=>{
    cy.get('#root > div > main > div > form > div.modal-overlay > div > div.modal-body > p').should('contain.text', 'Usuário ou senha inválidos.').and('be.visible')
    cy.get('#root > div > main > div > form > div.modal-overlay > div > div.modal-body > h3').should('contain.text', 'Falha ao autenticar').and('be.visible')
})

Then('o login não é realizado e avisos são exibidos', ()=>{
    cy.get(':nth-child(1) > .input-error').should('contain.text', "Informe o e-mail.")
    cy.get(':nth-child(2) > .input-error').should('contain.text', "Informe a senha")

})