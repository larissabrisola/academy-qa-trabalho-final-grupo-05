export default class ProfilePage {
    notaEstrelas = '.stars';
    estrelaCheia = '.star filled';
    movieCard = '.profile-review-card'
    linkNomeFilme = '.review-card-header';
    logoutLink = '[href="/logout"]';
    ratingsContainer = '.ratings-container';

    clickLinkFilme(){
        cy.get(this.linkNomeFilme).click()
       }
    
    clickLogoutLink(){
        cy.get(this.logoutLink).click()
       }

}
