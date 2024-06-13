import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import MovieDetailsPage from "../pages/movieDetails.page";
import InicialPage from "../pages/inicial.page";
import LoginPage from "../pages/login.page";

const pageLogin = new LoginPage();
const inicialPage = new InicialPage();
const movieDetails = new MovieDetailsPage();

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


Given('que estou logado e na tela de um filme específico', () => {
    cy.visit(Cypress.env('inicial_url') + 'login');
    pageLogin.login(email, password);
    cy.wait(2000);
    inicialPage.selecionaFilmeEspecifico(filme.title)
})

Given('que acesso à tela de filmes', () => {
    cy.visit(Cypress.env('inicial_url'))
})

Given('que fiz a avaliação de um filme', () => {
    cy.visit(Cypress.env('inicial_url') + 'login');
    pageLogin.login(email, password);
    cy.wait(2000);
    inicialPage.selecionaFilmeEspecifico(filme.title)
    movieDetails.avaliarFilme('Bom!')
})

When('buscar e selecionar um filme específico', () => {
    inicialPage.selecionaFilmeEspecifico(filme.title)
})

When('criar uma nova avaliação', () => {
    movieDetails.avaliarFilme('bom!')
})

When('concluir operação', () => {
    cy.contains('button', 'Enviar').click();
})

Then('será possível visualizar a avaliação criada', () => {
    cy.contains(movieDetails.nameUser, name);
    cy.contains(name).should('be.visible');
    cy.get(movieDetails.ratedStar).should('be.visible')
    cy.get(movieDetails.cardReview).should('be.visible')
})

Then('o sistema encaminhará para a tela de login', () => {
    cy.contains('Entre para poder escrever sua review').click();
    cy.contains(pageLogin.loginContent,'Login').should('be.visible');
    cy.contains(pageLogin.loginContent,'Entre com suas credenciais').should('be.visible');
})


Then('não será possível criar uma avaliação', () => {
    cy.contains(movieDetails.modalErro, 'Ocorreu um erro')
    cy.contains(movieDetails.modalErro, 'Selecione uma estrela para avaliar o filme')
})

Then('será possível visualizar a opção {string}', (mensagem) => {
    cy.wait(2000)
    cy.contains(mensagem).should('be.visible')
})

When('inserir um texto de avaliação', () => {
    movieDetails.typeReview('Gostei!')
})

When('atribuir uma nota', () => {
    movieDetails.clickRatingStars();
    cy.wait(2000);
})

Then('a nota é exibida e avaliação fica em branco', () => {
    cy.contains(movieDetails.nameUser, name);
    cy.contains(name).should('be.visible');
    cy.get(movieDetails.ratedStar).should('be.visible')
    cy.get(movieDetails.cardReview).should('be.empty')
})

When('reescrever nova avaliação', () => {
    cy.get(movieDetails.inputReview).clear();
    movieDetails.typeReview('Não gostei!')
})

Then('a avaliação antiga será atualizada', () => {
    cy.contains(movieDetails.userReviewCard, 'Não gostei!').should('be.visible')
})

When('inserir um texto avaliativo com 500 caracteres', () => {
    movieDetails.typeReview('n'.repeat(500))
})

When('inserir um texto avaliativo com mais de 500 caracteres', () => {
    movieDetails.typeReview('n'.repeat(501))
})

Then('a avaliação não será enviada', () => {
    cy.get(movieDetails.nameUser).should('not.exist');
    cy.contains(name).should('not.exist');
    cy.get(movieDetails.ratedStar).should('not.exist')
    cy.get(movieDetails.cardReview).should('not.exist')
})