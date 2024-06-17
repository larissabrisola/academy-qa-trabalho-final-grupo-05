Feature: Login
    Como um usuário com registro no sistema
    Desejo efetuar login
    Para poder gerenciar minhas informações, avaliar filmes ou gerenciar o sistema.
    
    Background: usuário está na tela de login
        Given usuário está na tela de login

    Scenario: Deve ser possivel realizar login
        When informar email cadastrado
        And preencher a senha corretamente
        And clicar em Login
        Then o login é realizado com sucesso

    Scenario: Não deve ser possivel realizar login com senha incorreta
        When informar email cadastrado
        And preencher a senha "uwuwuwu"
        And clicar em Login
        Then o login não é realizado e a mensagem "Falha ao autenticar. Usuário ou senha inválidos." é exibida

    Scenario: Não deve ser possivel realizar login com email não cadastrado
        When informar o email "pomboisnmss013chav@crow.net"
        And preencher a senha corretamente
        And clicar em Login
        Then o login não é realizado e a mensagem "Falha ao autenticar. Usuário ou senha inválidos." é exibida

    Scenario: Não deve ser possivel realizar login sem preencher email
        When preencher a senha corretamente
        And clicar em Login
        Then o login não é realizado e uma mensagem deve ser exibida "Informe o e-mail."

    Scenario: Não deve ser possivel realizar login sem preencher senha
        When informar email cadastrado
        And clicar em Login
        Then o login não é realizado e uma mensagem deve ser exibida "Informe a senha"

    Scenario: Não deve ser possivel realizar login sem informar email e senha
        When clicar em Login
        Then o login não é realizado e uma mensagem deve ser exibida "Informe a senha"
        Then o login não é realizado e uma mensagem deve ser exibida "Informe o e-mail."

