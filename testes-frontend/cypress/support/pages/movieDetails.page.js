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


    buttonSignInToReview = '[href="/login"]'
    buttonEnviar = '[type="submit"]'

    typeReview(review) {
        cy.get(this.inputReview).type(review)
    };

    clickRatingStars() {
        cy.get(this.stars).each(($e) => {
            cy.wrap($e).click()
        })

        // cy.get(this.ratingStarstars).eq(3).click({ multiple: true })
    }

    // clickRatingStars(){
    //     cy.get(this.ratingStar).click()
    // }

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