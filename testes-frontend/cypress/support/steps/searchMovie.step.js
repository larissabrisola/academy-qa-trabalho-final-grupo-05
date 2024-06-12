import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import InicialPage from "../pages/inicial.page";

const inicialPage = new InicialPage()

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

    After(() => {
        cy.deleteUser(uId, uToken, true)
    })
})

Given('que estou na tela de filmes', () => {
    cy.visit(Cypress.env('inicial_url'))
})

Given('que estou logado e na tela de filmes', () => {
    cy.visit(Cypress.env('inicial_url'))
})

When('informar o nome de um filme na barra de pesquisa', () => {
    inicialPage.typePesquisa(filme.title)
})

When('concluir operação', () => {
    inicialPage.clickButtonSearch()
})

Then('será possível visualizar o filme pesquisado', () => {
    cy.contains(inicialPage.movieTitle, filme.title)
})

When('informar o nome de um filme que foi deletado', () => {
    cy.deleteMovie(filme.id, uToken)
    inicialPage.typePesquisa(filme.title)
})

Then('não será possível visualizar o filme na lista', () => {
    cy.contains(inicialPage.noMovies, 'Nenhum filme encontrado')
})

When('informar parcialmente o nome de um filme', () => {
    inicialPage.typePesquisa(filme.title.slice(0, 3))
})

Then('será possível visualizar lista de filmes que contem o que foi pesquisado', () => {
    cy.get(inicialPage.movieTitle).contains(filme.title.slice(0, 3)).and('be.visible')

})

When('informar o nome e o ano de lançamento do filme', () => {
    inicialPage.typePesquisa(filme.title + ' ' + filme.releaseYear)
})

When('informar o id de um filme no campo de pesquisa', () => {
    inicialPage.typePesquisa(filme.id)
})