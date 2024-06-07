export default class RegisterPage {
    inputName = "#root > div > main > div > form > div:nth-child(1) > input"
    inputEmail = "#root > div > main > div > form > div:nth-child(2) > input"
    inputPassword = "#root > div > main > div > form > div:nth-child(3) > input"
    inputConfirmPassword = "#root > div > main > div > form > div:nth-child(4) > input"
    buttonSave = '.account-save-button'
    
   
   typeName (name){
    cy.get(this.inputName).type(name)
   }

   typeEmail (email){
    cy.get(this.inputEmail).type(email)
   }

   typePassword (password){
    cy.get(this.inputPassword).type(password)
   }

   typePasswordConfirm (password){
    cy.get(this.inputConfirmPassword).type(password)
   }

   clickButtonSave(){
    cy.get(this.buttonSave).click()
   }

   
}