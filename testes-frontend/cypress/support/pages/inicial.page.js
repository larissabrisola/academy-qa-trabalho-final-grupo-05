export default class InicialPage {
    inputPesquisa = 'input[placeholder="Buscar filmes"]';
    movieTitle = '.movie-title';
    movieBackground = '.movie-details';
    movieCard = '.movie-card';
    noMovies = '.main';

    linkPerfil = '[href="/profile"]'
    buttonSearch = '.search-button'

    firstMovieList = ".top-rated-movies > div.carousel-container > div.carousel-data > a:nth-child(1)"

    typePesquisa(filme){
        cy.get(this.inputPesquisa).type(filme)
    }

    clickButtonSearch() {
        cy.get(this.buttonSearch).click()
    }

    clickMovieCard() {
        cy.get(this.movieCard).click({multiple: false})
    }

    clicklinkPerfil() {
        cy.get(this.linkPerfil).click()
    }

    clickFirstMovieList (){
        cy.get(this.firstMovieList).click()
    }
}