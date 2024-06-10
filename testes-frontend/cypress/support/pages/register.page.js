export default class RegisterPage {
    inputName = '[name="name"]'
    inputEmail = '[name="email"]'
    inputPassword = '[name="password"]'
    inputConfirmPassword = '[name="confirmPassword"]'
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