import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";

// let movieCreated = {
//     title: faker.music.songName(),
//     genre: faker.music.genre(), 
//     description: faker.lorem.words(), 
//     durationInMinutes: 120, 
//     releaseYear: 2020
// }

Given('usuário está na tela inicial', ()=>{
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/')
    cy.url().should('eq', 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/')
})

When('existir filmes cadastrados', ()=>{
    cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies').as('moviesIntercept')
    cy.wait('@moviesIntercept').then((response)=>{
        if(response.body == []){
            cy.fixture('movies.json').then((movies) => {
                cy.adminCreatesALotOfMovies(movies, false);
              });
              
        } else 
            return
    })
})

When('não existir filmes cadastrados', ()=>{
    cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies', {
        body: []
    })
})

Then('um aviso será exibido', ()=>{
    cy.contains('Ops! Parece que ainda não temos nenhum filme.')
})

Then('deve ser possivel visualizar duas categorias de filmes', ()=>{
    cy.contains('Filmes em destaque').should('be.visible')
    cy.contains('Mais bem avaliados').should('be.visible')
})

