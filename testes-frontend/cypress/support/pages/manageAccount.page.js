export default class ManageAccountPage {
    inputName = 'input[name="name"]'
    inputEmail = 'input[name="email"]'
    typeUser = 'select[name="type"]'
    btnAlterarSenha = '.account-password-button'
    inputPassword = 'input[name="password"]'
    inputConfirmPassword = 'input[name="confirmPassword"]'
    btnSalvar = '.account-save-button'

    typeName(nome){
        cy.get(this.inputName).clear()
        cy.get(this.inputName).type(nome)
    }

    typePassword(password){
        cy.get(this.inputPassword).type(password)
    }

    typeConfirmPassword(confirmPass){
        cy.get(this.inputConfirmPassword).type(confirmPass)
    }

    clickBtnSalvar (){
        cy.get(this.btnSalvar).click()
    }

    clickBtnAlterarSenha (){
        cy.get(this.btnAlterarSenha).click()
    }


    clickTypeUser(){
        cy.get(this.typeUser).select()
    }
}