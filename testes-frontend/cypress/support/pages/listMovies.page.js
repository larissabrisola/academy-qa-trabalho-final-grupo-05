export default class ListMoviesPage {
    btnProximoDestaque = ".featured-movies > div.carousel-container > button:nth-child(3)"
    btnAnteriorDestaque = ".featured-movies > div.carousel-container > button:nth-child(1)"
    btnAnteriorAvaliados = ".top-rated-movies > div.carousel-container > button:nth-child(1)"
    btnProximoAvaliados = ".top-rated-movies > div.carousel-container > button:nth-child(3)"

    firstMovieList = "#root > div > main > section.featured-movies > div.carousel-container > div.carousel-data > a:nth-child(1)"


    clickBtnProximoDestaque (){
        cy.get(this.btnProximoDestaque).click()
    }
    clickBtnAnteriorDestaque (){
        cy.get(this.btnAnteriorDestaque).click()
    }

    clickBtnProximoAvaliados (){
        cy.get(this.btnProximoAvaliados).click()
    }

    clickBtnAnteriorAvaliados (){
        cy.get(this.btnAnteriorAvaliados).click()
    }
    
    clickFirstMovieList (){
        cy.get(this.firstMovieList).click()
    }

}