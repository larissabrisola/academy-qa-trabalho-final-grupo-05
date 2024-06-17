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
    inicialPage.clickFirstMovieList();
    movieDetails.avaliarFilme('Gostei!')
    cy.contains('button', 'Enviar').click();
})

Given('sou um usuário qualquer', () => {
    cy.visit(Cypress.env('inicial_url'))
})

Given('que estou logado e não relizei avaliações previamente', () => {
    cy.visit(Cypress.env('inicial_url') + 'login')
    loginPage.login(email, password)
})

When('acessar meu perfil', () => {
    inicialPage.clicklinkPerfil();
})

When('selecionar uma avaliação feita anteriormente', () => {
    profilePage.clickLinkFilme();
})

When('e inserir novas informaçoes', () => {
    cy.get(movieDetails.inputReview).clear();
    movieDetails.typeReview('Não gostei!')
    cy.contains('button', 'Enviar').click();
})

Then('visualizo nome, nota e texto avaliativo dos filmes avaliados', () => {
    cy.get(profilePage.linkNomeFilme).should('be.visible')
    cy.get(profilePage.notaEstrelas).should('be.visible')
    cy.get(profilePage.movieCard).contains('Gostei!')
    cy.get(profilePage.movieDescription).should('be.visible')

})

Then('será possível visualizar os detalhes do filme avaliado', () => {
    cy.get(movieDetails.titleMovie).should('be.visible')
    cy.get(movieDetails.dataMovie).should('be.visible')
    cy.get(movieDetails.dataMovie).should('be.visible')
    cy.get(movieDetails.moviePoster).should('be.visible')
})

Then('a avaliação antiga será atualizada', () => {
    cy.get(movieDetails.userReviewCard).contains(name)
    cy.contains(movieDetails.userReviewCard, 'Não gostei!').should('be.visible')
})

Then('não tenho acesso à tela de perfil e às avaliações', () => {
    cy.get(inicialPage.linkPerfil).should('not.exist')
    cy.contains('Minhas avaliações').should('not.exist')
})

Then('visualizo a lista de avaliações em branco', () => {
    cy.contains('Minhas avaliações').should('be.visible')
    cy.get(profilePage.ratingsContainer).should('be.empty')
})