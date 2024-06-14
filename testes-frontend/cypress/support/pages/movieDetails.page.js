export default class MovieDetailsPage {

    inputReview = 'textarea[placeholder="O que você acha deste filme ?"]'
    stars = '.stars'
    ratingStar = '.review-form-star.false'
    ratedStar = 'div.star-container-reviewcard'
    nameUser = '.user-reviecard-info'
    userReviewCard = '.user-review-card'
    userReviewInfo = '.user-review-info'
    modalErro = '.modal-content'
    buttonModalOk = '.modal-actions'
    cardReview = '.user-review-card'
    titleMovie = '.movie-details-title'
    descriptionMovie = '.movie-detail-description'
    dataMovie = '.movie-details-info-with-icon'
    moviePoster = '.w-full.h-auto.rounded-lg'
    containerMedia = '.star-container'
    
    buttonSignInToReview = '[href="/login"]'
    buttonEnviar = '[type="submit"]'

    typeReview(review) {
        cy.get(this.inputReview).type(review)
    };

    clickRatingStars() {
        cy.get(this.stars).each(($e) => {
            cy.wrap($e).click()
        })
    }

    clickButtonEnviar() {
        cy.get(this.buttonEnviar).click()
    }

    clickButtonSignInToReview() {
        cy.get(this.buttonSignInToReview).click()
    }

    clickButtonModalOk() {
        cy.get(this.clickButtonModalOk).click()
    }

    avaliarFilme(texto) {
        this.clickRatingStars();
        this.typeReview(texto);
        cy.wait(2000);
    }
}