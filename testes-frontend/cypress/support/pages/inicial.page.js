export default class InicialPage {
    inputPesquisa = 'input[placeholder="Buscar filmes"]';
    movieTitle = '.movie-title';
    movieBackground = '.movie-details';
    movieCard = '.movie-card';
    noMovies = '.main';

    buttonSearch = '.search-button'

    typePesquisa(filme){
        cy.get(this.inputPesquisa).type(filme)
    }

    clickButtonSearch() {
        cy.get(this.buttonSearch).click()
    }

    clickMovieCard() {
        cy.get(this.movieCard).click()
    }

    selecionaFilmeEspecifico(filme){
        this.typePesquisa(filme);
        this.clickButtonSearch();
        this.clickMovieCard();
    }
}