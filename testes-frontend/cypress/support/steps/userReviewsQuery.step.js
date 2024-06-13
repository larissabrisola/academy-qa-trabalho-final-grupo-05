import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import LoginPage from "../pages/login.page";
import ProfilePage from "../pages/profile.page";
import MovieDetailsPage from "../pages/movieDetails.page";
import InicialPage from "../pages/inicial.page";

const loginPage = new LoginPage()
const profilePage = new ProfilePage();
const movieDetails = new MovieDetailsPage();
const inicialPage = new InicialPage();
const pageLogin = new LoginPage();


let uId;
let uToken;
let filme;

let name
let email
let password = "1234567"

Before(() => {
    name = faker.person.fullName();
    email = faker.internet.email().toLowerCase();

    cy.createUser(name, email, password, false).then((response) => {
        uId = response.body.id
    })
    cy.login(email, password).then((response) => {
        uToken = response.body.accessToken
        cy.promoteAdmin(uToken)
    })
    cy.createMovie().then((response) => {
        cy.wrap(response).as('data')
    });
    cy.get('@data').then((data) => {
        filme = data;
    })
})

After(() => {
    cy.promoveAdmin(uToken)
    cy.deleteUser(uId, uToken)
})

Given('que estou logado e avaliei previamente um filme', () => {
    cy.visit(Cypress.env('inicial_url') + 'login')
    loginPage.login(email, password)
    inicialPage.selecionaFilme(filme.title);
    movieDetails.avaliarFilme('Gostei!')
    cy.contains('button', 'Enviar').click();
})

Given('sou um usuário qualquer', () => {
    cy.visit(Cypress.env('inicial_url'))

})

Given('que estou logado', () => {
    cy.visit(Cypress.env('inicial_url') + 'login')
    loginPage.login(email, password)
    cy.wait(1000)
})

When('acessar meu perfil', () => {
    cy.wait(1500);
    inicialPage.clicklinkPerfil();
})

Then('visualizo nome, nota e texto avaliativo dos filmes avaliados', () => {
    cy.get(profilePage.linkNomeFilme).contains(filme.title)
    cy.get(profilePage.notaEstrelas).should('be.visible')
    cy.get(profilePage.movieCard).contains('Gostei!')
})

When('selecionar uma avaliação', () => {
    profilePage.clickLinkFilme();
})

Then('será possível visualizar os detalhes do filme avaliado', () => {

})

When('editar avaliação', () => {

})

Then('será possível editar o comentário e a nota', () => {

})

Then('não será possível criar nova avaliação', () => {

})

Given('sou um usuário qualquer', () => {

})

Then('não tenho acesso à tela de perfil', () => {

})

Then('não será possível consultar minha lista de avaliações', () => {

})

Given('não relizei avaliações previamente', () => {

})

Then('visualizo a lista de avaliações em branco', () => {
    
})