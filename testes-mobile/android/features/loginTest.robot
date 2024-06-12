*** Settings ***
Test Setup    Abrir App
Test Teardown    TearDown
Resource    ..//base.robot


*** Test Cases ***
Login realizado com sucesso
    Dado que usuário está na tela de login
    Quando informar email cadastrado
    E preencher a senha corretamente
    E clicar em Login
    Entao o login é realizado com sucesso

Não deve ser possivel realizar login com senha incorreta
    Dado que usuário está na tela de login
    Quando informar email cadastrado
    E preencher a senha incorretamente
    E clicar em Login
    Entao o login não é realizado e a mensagem "Usuário ou senha inválidos." é exibida

Não deve ser possivel realizar login com email não cadastrado
    Dado que usuário está na tela de login
    Quando informar o email um email nao cadastrado
    E preencher a senha corretamente
    E clicar em Login
    Entao o login não é realizado e a mensagem "Usuário ou senha inválidos." é exibida

Não deve ser possivel realizar login sem preencher email
    Dado que usuário está na tela de login
    Quando preencher a senha corretamente
    E clicar em Login
    Entao o login não é realizado e uma mensagem deve ser exibida "Informe o e-mail."

Não deve ser possivel realizar login sem preencher senha
    Dado que usuário está na tela de login
    Quando informar email cadastrado
    E clicar em Login
    Entao o login não é realizado e uma mensagem deve ser exibida "Informe a senha"

Não deve ser possivel realizar login sem informar email e senha
    Dado que usuário está na tela de login
    Quando clicar em Login
    Entao o login não é realizado e uma mensagem deve ser exibida "Informe a senha"
    Entao o login não é realizado e uma mensagem deve ser exibida "Informe o e-mail."