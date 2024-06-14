import { Given, When, Then, Before, BeforeAll, After } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import InicialPage from "../pages/inicial.page";
import LoginPage from "../pages/login.page";
import ProfilePage from "../pages/profile.page";

const inicialPage = new InicialPage()
const loginPage = new LoginPage()
const profilePage = new ProfilePage();

let uId;
let uToken;
let filme;

let name = faker.person.fullName();
let email = faker.internet.email().toLowerCase();
let password = "1234567"

Before(() => {
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
    cy.promoteAdmin(uToken).then(() => {
        cy.deleteUser(uId, uToken, true)
    })
})

Given('que estou na tela de filmes', () => {
    cy.visit(Cypress.env('inicial_url'))
})

Given('que estou logado e na tela de filmes', () => {
    cy.visit(Cypress.env('inicial_url') + 'login')
    loginPage.login(email, password)
})

When('informar o nome de um filme na barra de pesquisa', () => {
    inicialPage.typePesquisa(filme.title)
})

When('concluir operação', () => {
    inicialPage.clickButtonSearch()
})

When('informar o nome de um filme não cadastrado', () => {
    inicialPage.typePesquisa('AriErikoLariManoscreu')
})

When('informar o nome de um filme que foi deletado', () => {
    cy.deleteMovie(filme.id, uToken)
    inicialPage.typePesquisa(filme.title)
})

When('informar parcialmente o nome de um filme', () => {
    inicialPage.typePesquisa(filme.title.slice(0, 3))
})

When('informar o nome e o ano de lançamento do filme', () => {
    inicialPage.typePesquisa(filme.title + ' ' + filme.releaseYear)
})

When('informar o id de um filme no campo de pesquisa', () => {
    inicialPage.typePesquisa(filme.id)
})

Then('será possível visualizar o filme pesquisado', () => {
    cy.contains(inicialPage.movieTitle, filme.title)
})

Then('não será possível visualizar o filme na lista', () => {
    cy.contains(inicialPage.noMovies, 'Nenhum filme encontrado')
})

Then('será possível visualizar lista de filmes que contem o que foi pesquisado', () => {
    cy.get(inicialPage.movieTitle).contains(filme.title.slice(0, 3)).and('be.visible')

})