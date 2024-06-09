import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import LoginPage from "../pages/login.page"
import ManageAccount from "../pages/manageAccount.page"
let pageLogin = new LoginPage()
let pageManageAccount = new ManageAccount()

let novaSenhaValida = "boitata10"
let email
let name 
let password
let id 
let token 

beforeEach(()=>{
    email = "s" + faker.internet.exampleEmail()
    name = faker.animal.cetacean()
    password = "portugal"

    cy.createAndLoginUser(name,email, password).then((response)=>{
        id = response.id
        token = response.token
    })
    
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login')

    pageLogin.typeEmail(email)
    pageLogin.typePassword(password)
    pageLogin.clickButtonLogin()

    cy.url().should('eq', 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/')
})

afterEach(()=>{
    cy.promoveAdmin(token)
    cy.deleteUser(id, token)
})

Given('que o usuário está logado e na tela de gerenciar conta', ()=>{
    cy.visit(Cypress.env('manageAccount'))
    cy.url().should('eq', 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/account')
})

When('informar nome {string}', (string)=>{
    pageManageAccount.typeName(string)
})

When('informar senha {string}', (string)=>{
    pageManageAccount.clickBtnAlterarSenha()
    pageManageAccount.typePassword(string)
})

When('confirmar senha {string}', (string)=>{
    pageManageAccount.typeConfirmPassword(string)
})
When('informar novo nome válido', ()=>{
    let nomeValido = faker.animal.snake()
    pageManageAccount.typeName(nomeValido)
})

When('informar nova senha válida', ()=>{
    pageManageAccount.clickBtnAlterarSenha()
    pageManageAccount.typePassword(novaSenhaValida)
})

When('clicar em Alterar senha', ()=>{
    pageManageAccount.clickBtnAlterarSenha()
})

When('deixar o campo nome vazio', ()=>{
    cy.get(pageManageAccount.inputName).clear()
})
When('confirmar senha válida', ()=>{
    pageManageAccount.typeConfirmPassword(novaSenhaValida)
})

When('confirmar senha inválida', ()=>{
    pageManageAccount.typeConfirmPassword('jane2thev')
})

When('clicar em Salvar', ()=>{
    pageManageAccount.clickBtnSalvar()
})

When('usuário visualizar o campo email', ()=>{
    cy.contains('E-mail').should('be.visible')
})

When('usuário visualizar o campo tipo de usuário', ()=>{
    cy.contains('Tipo de usuário:').should('be.visible')
})

Then('a atualização será realizada', ()=>{
    cy.get('.modal-body').should('contain.text', "SucessoInformações atualizadas!")
})

Then('ele verá que o campo email está desabilitado', ()=>{
    cy.get(pageManageAccount.inputEmail).should('be.disabled')
})

Then('ele verá que o campo tipo de usuário está desabilitado', ()=>{
    cy.get(pageManageAccount.typeUser).should('be.disabled')
})

Then('a atualização não é realizada e um aviso será exibido {string}', (string)=>{
    cy.contains(string).should('be.visible')
})