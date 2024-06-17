Feature: Gerenciar conta
    Como um usuáriodo sistema
    Desejo poder gerenciar minha conta
    Para ter controle sobre minhas informações
    
    Background: Usuário está logado e na tela de gerenciar conta
        Given que o usuário está logado e na tela de gerenciar conta

    Scenario: Deve ser possivel atualizar o próprio nome
        When informar novo nome válido
        And clicar em Salvar
        Then a atualização será realizada

    Scenario: Deve ser possivel atualizar a propria senha
        When informar nova senha válida
        And confirmar senha válida
        And clicar em Salvar
        Then a atualização será realizada

    Scenario: Deve ser possivel atualizar nome e senha simultaneamente
        When informar novo nome válido
        And informar nova senha válida
        And confirmar senha válida
        And clicar em Salvar
        Then a atualização será realizada

    Scenario: Deve ser possivel atualizar nome inserindo 100 caracteres
        When informar nome "OpenupthedoorcanyouopenupthedoorOpenupthedoorcanyouopenupthedoorOpenupt"
        And clicar em Salvar
        Then a atualização será realizada

    Scenario: Deve ser possivel atualizar senha inserindo 12 caracteres
        When informar senha "123456789101"
        And confirmar senha "123456789101"
        And clicar em Salvar
        Then a atualização será realizada

    Scenario: Não deve ser possivel atualizar email
        When usuário visualizar o campo email
        Then ele verá que o campo email está desabilitado

    Scenario: Não deve ser possivel atualizar tipo de usuário
        When usuário visualizar o campo tipo de usuário
        Then ele verá que o campo tipo de usuário está desabilitado

    Scenario: Não deve ser possivel atualizar senha com confirmação de senha diferente
        When informar nova senha válida
        And confirmar senha inválida
        And clicar em Salvar
        Then a atualização não é realizada e um aviso será exibido "As senhas devem ser iguais"

    Scenario Outline: Não deve ser possivel atualizar nome inserindo 101 ou mais caracteres
        When informar nome "<nome>"
        And clicar em Salvar
        Then a atualização não é realizada e um aviso será exibido "O nome deve ter no máximo 100 dígitos."
        Examples:
            | nome                                                                                                     |
            | 101assistamjanethevirginoucambillieeilishassistamjanethevirginoucambillieeilishassistamjanethevirginw    |
            | 102euodeiotedmosbyeuodeiotedmosbyeuodeiotedmosbyeuodeiotedmosbyeuodeiotedmosbyeuodeiotedmosbyseuodeiot   |
            | 104sgirlsboysgirlsboysgirlsboysgirlsboysgirlsboysgirlsboysgirlsboysgirlsboysgirlsboysgirlsboysgirlsbosad |

    Scenario Outline: Não deve ser possivel atualizar a senha inserindo 13 ou mais caracteres
        When informar senha "<senha>"
        And confirmar senha "<senha>"
        And clicar em Salvar
        Then a atualização não é realizada e um aviso será exibido "Não foi possível atualizar os dados."
        Examples:
            | senha           |
            | 1234567891234   |
            | 12345678912345  |
            | 123456789123456 |

    Scenario Outline: Não deve ser possivel atualizar senha inserindo 5 ou menos caracteres
        When informar senha "<senha>"
        And confirmar senha "<senha>"
        And clicar em Salvar
        Then a atualização não é realizada e um aviso será exibido "A senha deve ter pelo menos 6 dígitos"
        Examples:
            | senha |
            | 123   |
            | 1234  |
            | 1     |

    Scenario Outline: Não deve ser possivel atualizar senha deixando o campo vazio
        When clicar em Alterar senha
        And clicar em Salvar
        Then a atualização não é realizada e um aviso será exibido "Campo obrigatório"

    Scenario Outline: Não deve ser possivel atualizar nome deixando o campo vazio
        When deixar o campo nome vazio
        And clicar em Salvar
        Then a atualização não é realizada e um aviso será exibido "Informe o nome."

