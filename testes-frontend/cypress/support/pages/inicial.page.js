export default class InicialPage {
    inputPesquisa = 'text[placeholder="Buscar filmes"]';
    movieTitle = '.movie-title';
    movieBackground = '.movie-details';
    movieCard = '.movie-card';
    noMovies = '.main';

    buttonSearch = '.search-button'

    typePesquisa(filme){
        cy.get(this.inputPesquisa).type(filme)
    }

    clickButtonSearch() {
        cy.get(this.clickButtonSearch).click()
    }

    clickMovieCard() {
        cy.get(this.movieCard).click()
    }
}