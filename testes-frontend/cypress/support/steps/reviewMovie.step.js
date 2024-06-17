import {
  Given,
  When,
  Then,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import MovieDetailsPage from "../pages/movieDetails.page";
import InicialPage from "../pages/inicial.page";
import LoginPage from "../pages/login.page";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

const pageLogin = new LoginPage();
const inicialPage = new InicialPage();
const movieDetails = new MovieDetailsPage();

let uId;
let uToken;
let filme;

let name;
let email;
let password = "1234567";
let bigtexto;


Before(() => {
  name = faker.person.fullName();
  email = faker.internet.email().toLowerCase();

  cy.createUser(name, email, password, false).then((response) => {
    uId = response.body.id;
  });
  cy.login(email, password).then((response) => {
    uToken = response.body.accessToken;
    cy.promoteAdmin(uToken);
  });
  cy.createMovie().then((response) => {
    cy.wrap(response).as("data");
  });
  cy.get("@data").then((data) => {
    filme = data;
  });
});

Given("que estou logado e na tela de um filme específico", () => {
  cy.visit(Cypress.env("inicial_url") + "login");
  pageLogin.login(email, password);
  inicialPage.clickFirstMovieList();
});

Given("que acesso à tela de filmes", () => {
  cy.visit(Cypress.env("inicial_url"));
});

Given("que fiz a avaliação de um filme", () => {
  cy.visit(Cypress.env("inicial_url") + "login");
  pageLogin.login(email, password);
  inicialPage.clickFirstMovieList();
  movieDetails.avaliarFilme("Bom!");
});

When("buscar e selecionar um filme específico", () => {
  inicialPage.clickFirstMovieList();
});

When("criar uma nova avaliação", () => {
  movieDetails.avaliarFilme("bom!");
});

When("concluir operação", () => {
  cy.contains("button", "Enviar").click();
});

When("inserir um texto de avaliação", () => {
  movieDetails.typeReview("Gostei!");
});

When("atribuir uma nota", () => {
  movieDetails.clickRatingStars();
});

When("reescrever nova avaliação", () => {
  cy.get(movieDetails.inputReview).clear();
  movieDetails.typeReview("Não gostei!");
});

When("inserir um texto avaliativo com 500 caracteres", () => {
  movieDetails.typeReview(faker.string.alpha(500));
});

When("inserir um texto avaliativo com mais de 500 caracteres", () => {
  bigtexto = faker.string.alpha(501);
  movieDetails.typeReview(bigtexto);
});

Then("será possível visualizar imediatamente a avaliação criada", () => {
  cy.contains(name).should("be.visible");
  cy.get(movieDetails.ratedStar).should("be.visible");
  cy.get(movieDetails.cardReview).should("be.visible");
});

Then("o sistema encaminhará para a tela de login", () => {
  cy.contains("Entre para poder escrever sua review").click();
  cy.contains(pageLogin.loginContent, "Login").should("be.visible");
  cy.contains(pageLogin.loginContent, "Entre com suas credenciais").should(
    "be.visible"
  );
});

Then("não será possível criar uma avaliação", () => {
  cy.contains(movieDetails.modalErro, "Ocorreu um erro");
  cy.contains(
    movieDetails.modalErro,
    "Selecione uma estrela para avaliar o filme"
  );
});

Then("será possível visualizar a opção {string}", (mensagem) => {
  cy.contains(mensagem).should("be.visible");
});

Then("a nota é exibida e avaliação fica em branco", () => {
    cy.get(movieDetails.userReviewCard).should('contain.text', name)
});

Then("a avaliação antiga será atualizada", () => {
  cy.contains(movieDetails.userReviewCard, "Não gostei!").should("be.visible");
});

Then("a avaliação não será enviada", () => {
  cy.get(movieDetails.userReviewCard).should("not.contain.text", bigtexto);
});
