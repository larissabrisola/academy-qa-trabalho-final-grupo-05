*** Settings ***
Test Setup    Abrir App
Test Teardown    TearDown
Resource    ..//base.robot


*** Test Cases ***
usuário está na tela de login
    Dado que usuário está na tela de login

Login realizado com sucesso
    Quando informar email cadastrado
    E preencher a senha corretamente
    E clicar em Login
    Entao o login é realizado com sucesso

Não deve ser possivel realizar login com senha incorreta
    Quando informar email cadastrado
    E preencher a senha "uwuwuwu"
    E clicar em Login
    Entao o login não é realizado e a mensagem "Falha ao autenticar. Usuário ou senha inválidos." é exibida

Não deve ser possivel realizar login com email não cadastrado
    Quando informar o email "pomboisnmss013chav@crow.net"
    E preencher a senha corretamente
    E clicar em Login
    Entao o login não é realizado e a mensagem "Falha ao autenticar. Usuário ou senha inválidos." é exibida

Não deve ser possivel realizar login sem preencher email
    Quando preencher a senha corretamente
    E clicar em Login
    Entao o login não é realizado e uma mensagem deve ser exibida "Informe o e-mail."

Não deve ser possivel realizar login sem preencher senha
    Quando informar email cadastrado
    E clicar em Login
    Entao o login não é realizado e uma mensagem deve ser exibida "Informe a senha"

Não deve ser possivel realizar login sem informar email e senha
    Quando clicar em Login
    Entao o login não é realizado e uma mensagem deve ser exibida "Informe a senha"
    Entao o login não é realizado e uma mensagem deve ser exibida "Informe o e-mail."