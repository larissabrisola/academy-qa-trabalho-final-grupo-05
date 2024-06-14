import { Given, When, Then, BeforeAll, AfterAll } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import MovieDetailsPage from "../pages/movieDetails.page";
import LoginPage from "../pages/login.page";
import InicialPage from "../pages/inicial.page";

const movieDetails = new MovieDetailsPage()
const pageLogin = new LoginPage();
const inicialPage = new InicialPage()

let uId
let uToken
let filme
let mediaAudiencia
let mediaCritica
let name
let email
let password = "1234567"

BeforeAll(() => {
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

AfterAll(() => {
    cy.deleteUser(uId, uToken)
})

Given('que estou logado e na tela de filmes', () => {
    cy.visit(Cypress.env('inicial_url') + 'login');
    pageLogin.login(email, password);
    cy.wait(1500);
})

Given('que estou na tela de filmes', () => {
    cy.visit(Cypress.env('inicial_url'));
})

When('selecionar um filme', () => {
    inicialPage.selecionaFilme(filme.title);
})

When('adicionar uma avaliação', () => {
    movieDetails.avaliarFilme('Poderia ser melhor!')
    cy.contains('button', 'Enviar').click();
})

Then('tenho acesso à todas aos detalhes do filme selecionado', () => {
    cy.contains(movieDetails.titleMovie, filme.title).should('be.visible')
    cy.contains(movieDetails.dataMovie, filme.releaseYear).should('be.visible')
    cy.contains(movieDetails.dataMovie, filme.durationInMinutes / 60).should('be.visible')
    cy.contains(movieDetails.dataMovie, filme.genre).should('be.visible')
    cy.get(movieDetails.moviePoster).should('be.visible')
})

Then('consigo criar uma avaliação', () => {
    movieDetails.avaliarFilme('Gostei!!!')
})

Then('consigo visualizar todos os detalhes de uma avaliação', () => {
    cy.contains(movieDetails.nameUser, name);
    cy.contains(name).should('be.visible');
    cy.get(movieDetails.ratedStar).should('be.visible')
    cy.get(movieDetails.cardReview).should('be.visible')
    cy.get(movieDetails.ratedStar).should('be.visible')
})