export default class ProfilePage {
    notaEstrelas = '.stars';
    estrelaCheia = '.star filled';
    movieCard = '.profile-review-card'
    linkNomeFilme = '.review-card-header';
    logoutLink = '[href="/logout"]'

    clickLinkFilme(){
        cy.get(this.linkNomeFilme).click()
       }
    
    clickLogoutLink(){
        cy.get(this.logoutLink).click()
       }

}
