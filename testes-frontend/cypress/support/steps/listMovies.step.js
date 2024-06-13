import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import ListMoviesPage from "../pages/listMovies.page";
let pageListMovies = new ListMoviesPage()

let movieId
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

When('clicar no botão de próximo em filmes em destaque', ()=>{
    pageListMovies.clickBtnProximoDestaque()
})

When('clicar no botão de anterior em filmes em destaque', ()=>{
    pageListMovies.clickBtnProximoDestaque()
})

When('clicar no botão de próximo em filmes mais bem avaliados', ()=>{
    pageListMovies.clickBtnProximoAvaliados()
})

When('clicar no botão de anterior em filmes mais bem avaliados', ()=>{
    pageListMovies.clickBtnProximoAvaliados()
})


When('não existir filmes cadastrados', ()=>{
    cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies', {
        body: []
    })
})

When('clicar em um filme', ()=>{
    cy.get(pageListMovies.firstMovieList).then((response)=>{
        movieId = response.attr('href')
        pageListMovies.clickFirstMovieList()
    })
})


Then('usuário será redirecionado para a tela de detalhes do filme', ()=>{
    cy.url().should('eq', `https://raromdb-frontend-c7d7dc3305a0.herokuapp.com` + movieId)
})


Then('um aviso será exibido', ()=>{
    cy.contains('Ops! Parece que ainda não temos nenhum filme.').should('be.visible')
})

Then('deve ser possivel visualizar duas categorias de filmes', ()=>{
    cy.contains('Filmes em destaque').should('be.visible')
    cy.contains('Mais bem avaliados').should('be.visible')
})

Then('deve ser possivel visualizar as informações dos filmes', ()=>{
    cy.get('.carousel-data').find('a').each((cardMovie)=>{
        cy.wrap(cardMovie).find('label').should('be.visible')
        cy.wrap(cardMovie).find('.movie-details').should('be.visible')
        cy.wrap(cardMovie).find('.movie-title').should('be.visible')
        cy.wrap(cardMovie).find('p').should('be.visible')
    })
})

Then('deve ser possivel visualizar mais filmes', ()=>{
    cy.log('n sei ainda') 
})

Then('não deve ser possivel avançar', ()=>{
    cy.get(pageListMovies.clickBtnProximoDestaque()).should('be.disabled')
})

Then('não deve ser possivel clicar no botão anterior de filmes em destaque', ()=>{
    cy.get(pageListMovies.clickBtnAnteriorDestaque()).should('be.disabled')
})

Then('não deve ser possivel clicar no botão de próximo de filmes mais bem avaliados', ()=>{
    cy.get(pageListMovies.clickBtnProximoAvaliados()).should('be.disabled')
})

Then('não deve ser possivel clicar no botão anterior de filmes mais bem avaliados', ()=>{
    cy.get(pageListMovies.clickBtnAnteriorAvaliados()).should('be.disabled')
})

