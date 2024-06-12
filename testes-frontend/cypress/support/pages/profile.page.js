export default class ProfilePage {
    notaEstrelas = '.stars';
    estrelaCheia = '.star filled';
    
    linkNomeFilme = '.review-card-header';

    clickLinkFilme(){
        cy.get(this.linkNomeFilme).click()
       }

}
