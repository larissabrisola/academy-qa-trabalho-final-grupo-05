export default class MovieDetailsPage {

    inputReview = 'textarea[placeholder="O que você acha deste filme ?"]'
    reviewStars = '.stars'
    capa = '.class="w-full h-auto rounded-lg'

    buttonEnviar = 'button[type="submit"]'

    typeReview(review){
        cy.get(this.inputReview).type(review)
    };

    

    
}