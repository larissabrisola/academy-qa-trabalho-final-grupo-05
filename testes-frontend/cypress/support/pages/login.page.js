export default class LoginPage {
    inputEmail = 'input[name="email"]'
    inputPassword = 'input[name="password"]'
    buttonLogin = '.login-button'

    typeEmail(email){
        cy.get(this.inputEmail).type(email)
    }

    typePassword(password){
        cy.get(this.inputPassword).type(password)
    }

    clickButtonLogin (){
        cy.get(this.buttonLogin).click()
    }
}
