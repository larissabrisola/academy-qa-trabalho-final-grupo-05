import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import MovieDetailsPage from "../pages/movieDetails.page";
import InicialPage from "../pages/inicial.page";


const inicialPage = new InicialPage();
const movieDetails = new MovieDetailsPage();

let uId;
let uToken;
let filme;

let name = faker.person.fullName();
let email = faker.internet.email().toLowerCase();
let password = "1234567"

Before(() => {

    cy.createAndLoginUser(name,email, password).then((response)=>{
        uId = response.id
        uToken = response.token
    })


    After(()=>{
        cy.promoveAdmin(uToken)
        cy.deleteUser(uId, uToken)
    })
})

Given('que estou logado e na tela de um filme específico', () => {
    cy.visit(Cypress.env('inicial_url') + '/login')

    pageLogin.typeEmail(email)
    pageLogin.typePassword(password)
    pageLogin.clickButtonLogin()
})

Given('acesso à tela de filmes', () => {
    cy.visit(Cypress.env('inicial_url'))
})

When('selecionar um filme qualquer', () => {
    inicialPage.clickButtonSearch(filme.title);
})

When('criar uma nova avaliação', () => {
    movieDetails.typeReview('Gostei!')
    movieDetails.clickRatingStars()
})

When('concluir operação', () => {
    movieDetails.clickButtonEnviar();
})

Then('será possível visualizar a avaliação criada', () => {
    cy.contains(movieDetails.nameUser, name)
    cy.contains(movieDetails.userReviewCard, name)
})

Then('não será possível criar uma avaliação', () => {
    movieDetails.typeReview('Gostei!')
    })
    
    Then('será possível visualizar a opção ${string}')
    cy.contains(movieDetails.buttonSignInToReview, "Entre para poder escrever sua review" )


When('atribuir uma nota', () => {

})

Then('a nota é exibida e avaliação fica em branco', () => {

})

When('selecionar uma avaliação feita por mim anteriormente', () => {

})

When('inserir nova avaliação', () => {

})

Then('a avaliação antiga será atualizada', () => {

})

Then('não será possível criar nova avaliação', () => {

})

When('inserir um texto avaliativo com 500 caracteres', () => {

})

When('inserir um texto avaliativo com mais de 500 caracteres')