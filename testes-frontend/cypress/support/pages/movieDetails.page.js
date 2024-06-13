export default class MovieDetailsPage {

    inputReview = 'textarea[placeholder="O que você acha deste filme ?"]'
    ratingStar = '.review-form-star filled false'
    ratedStar = '.filled'
    nameUser = '.user-reviecard-info'
    userReviewCard = '.user-review-card'
    
    capa = '.w-full h-auto rounded-lg'
    
    buttonSignInToReview = '[href="/login"]'
    buttonEnviar = 'button[type="submit"]'

    typeReview(review){
        cy.get(this.inputReview).type(review)
    };

    clickReviewStars(){
        cy.get(this.reviewStars).click()
    }

    clickRatingStars(){
        cy.get(this.ratingStar).click()
    }

    clickButtonEnviar(){
        cy.get(this.buttonEnviar).click()
    }

    clickButtonSignInToReview(){
        cy.get(this.buttonSignInToReview).click()
    }

    
}