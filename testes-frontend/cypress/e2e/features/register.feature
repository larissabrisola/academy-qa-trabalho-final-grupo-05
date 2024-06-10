Feature: Cadastro de usuário
    Como um usuário qualquer
    Quero poder me cadastrar
    Para poder ter acesso a mais funcionalidades do sistema

    Background: Página de cadastro
        Given que o usuário está na página de cadastro

    Scenario: Deve ser possivel cadastrar usuário
        When preencher o formulário com nome válido
        And preencher o formulário com email válido
        And preencher o formulário com senha válida
        And clicar em Cadastrar
        Then o usuário será cadastrado

    Scenario: Deve ser possivel cadastrar com nome contendo 100 caracteres
        When preencher o formulário com nome "IwishyouthebestfortherestofyourlifeFeltsorryforyouwhenIlookedinyoureyesbutIneedto confessItoldyouali"
        And preencher o formulário com email válido
        And preencher o formulário com senha válida
        And clicar em Cadastrar
        Then o usuário será cadastrado

    Scenario: Deve ser possivel cadastrar com email contendo 60 caracteres
        When preencher o formulário com nome válido
        And preencher o formulário com email contendo 60 caracteres
        And preencher o formulário com senha válida
        And clicar em Cadastrar
        Then o usuário será cadastrado

    Scenario: Deve ser possivel cadastrar com senha contendo 12 caracteres
        When preencher o formulário com nome válido
        And preencher o formulário com email válido
        And preencher o formulário com senha contendo 12 caracteres
        And clicar em Cadastrar
        Then o usuário será cadastrado

    Scenario: Deve ser possivel cadastrar com nome contendo 1 caractere
        When preencher o formulário com nome "A"
        And preencher o formulário com email válido
        And preencher o formulário com senha válida
        And clicar em Cadastrar
        Then o usuário será cadastrado

    Scenario: Não deve ser possivel cadastrar com email já utilizado - mensagem de alerta deve ser exibida
        When preencher o formulário com nome válido
        And preencher o formulário com email já cadastrado
        And preencher o formulário com senha válida
        And confirmar
        Then o usuário não será cadastrado e receberá um aviso "E-mail já cadastrado. Utilize outro e-mail"

    Scenario: Não deve ser possivel cadastrar se o campo nome estiver vazio
        When preencher o formulário com email válido
        And preencher o formulário com senha válida
        And clicar em Cadastrar
        Then o usuário não será cadastrado e receberá um aviso "Informe o nome."

    Scenario: Não deve ser possivel cadastrar se o campo email estiver vazio
        When preencher o formulário com nome válido
        And preencher o formulário com senha válida
        And clicar em Cadastrar
        Then o usuário não será cadastrado e receberá um aviso "Informe o e-mail."

    Scenario: Não deve ser possivel cadastrar se o campo senha estiver vazio
        When preencher o formulário com nome válido
        And preencher o formulário com email válido
        And clicar em Cadastrar
        Then o usuário não será cadastrado e receberá um aviso "Informe a senha"

    Scenario: Não deve ser possivel cadastrar se todos campos estiverem vazios
        When clicar em Cadastrar
        Then o usuário não será cadastrado e receberá um aviso "Informe o nome"
        Then o usuário não será cadastrado e receberá um aviso "Informe o e-mail"
        Then o usuário não será cadastrado e receberá um aviso "Informe a senha"

    Scenario Outline: Não deve ser possivel cadastrar com formato de email inválido
        When preencher o formulário com nome válido
        And preencher o formulário com email "<email>"
        And preencher o formulário com senha válida
        And clicar em Cadastrar
        Then o usuário não será cadastrado e receberá um aviso "Informe um e-mail válido."
        Examples:
            | email          |
            | joca.com       |
            | ruivo!k!@.com  |
            | boi@boi        |
            | boi@car😁a.com |

    Scenario: Não deve ser possivel cadastrar com email contendo 61 ou mais caracteres
        When preencher o formulário com nome válido
        And preencher o formulário com email "IwishyouthebestfortherestofyourlifeFeltsorryfor@ouwhenIl.oked"
        And preencher o formulário com senha válida
        And clicar em Cadastrar
        Then o usuário não será cadastrado e receberá um aviso "O e-mail deve ter no máximo 60 dígitos."

    Scenario: Não deve ser possivel cadastrar com email contendo 4 ou menos caracteres
        When preencher o formulário com nome válido
        And preencher o formulário com email "a@c."
        And preencher o formulário com senha válida
        And clicar em Cadastrar
        Then o usuário não será cadastrado e receberá um aviso "Informe pelo menos 5 dígitos para o e-mail"

    Scenario: Não deve ser possivel cadastrar com senha contendo 5 ou menos caracteres
        When preencher o formulário com nome válido
        And preencher o formulário com email válido
        And preencher o formulário com senha "assdf"
        And confirmar a senha "assdf"
        And clicar em Cadastrar
        Then o usuário não será cadastrado e receberá um aviso "A senha deve ter pelo menos 6 dígitos."

    Scenario: Não deve ser possivel cadastrar com senha contendo 13 ou mais caracteres
        When preencher o formulário com nome válido
        And preencher o formulário com email válido
        And preencher o formulário com senha "kokoliupokjhn"
        And confirmar a senha "kokoliupokjhn"
        And clicar em Cadastrar
        Then o usuário não será cadastrado e receberá um aviso "A senha deve ter no máximo 12 dígitos."

    Scenario: Não deve ser possivel cadastrar nome contendo 101 ou mais caracteres
        When preencher o formulário com nome "IwishyouthebestfortherestofyourlifeFeltsorryforyouwhenIlookedinyoureyesbutIneedtoconfessItoldyoualiea"
        And preencher o formulário com email válido
        And preencher o formulário com senha válida
        And clicar em Cadastrar
        Then o usuário não será cadastrado e receberá um aviso "O nome deve ter no máximo 100 dígitos."

    Scenario: Não deve ser possivel realizar o cadastro se a senha e confirmação da senha não forem iguais
        When preencher o formulário com nome válido
        And preencher o formulário com email válido
        And preencher o formulário com senha "umdoistresq"
        And confirmar a senha "doistresumq"
        And clicar em Cadastrar
        Then o usuário não será cadastrado e receberá um aviso "As senhas devem ser iguais."

    Scenario: Não deve ser possivel realizar o cadastro sem confirmar senha
        When preencher o formulário com nome válido
        And preencher o formulário com email válido
        And preencher o formulário com senha "umdoistresq"
        And clicar em Cadastrar
        Then o usuário não será cadastrado e receberá um aviso "Informe a senha"