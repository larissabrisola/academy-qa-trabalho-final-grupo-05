export default class LoginPage {
    inputEmail = "#root > div > main > div > form > div:nth-child(1) > input[type=text]"
    inputPassword = "#root > div > main > div > form > div:nth-child(2) > input[type=password]"
    buttonLogin = "#root > div > main > div > form > button"

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
