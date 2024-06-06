import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('usuário está na tela de login', ()=>{
    cy.visit(Cypress.env('login_url'))
    cy.url().should('eq', "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login")
})

