*** Settings ***
Test Setup    Abrir App
Test Teardown    TearDown
Resource    ..//base.robot


*** Test Cases ***
# Como um usuário qualquer
# Quero poder me cadastrar
# Para poder ter acesso a mais funcionalidades do sistema

Deve ser possivel cadastrar usuário
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Entao o usuário será cadastrado

Deve ser possivel cadastrar com nome contendo 100 caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome "IwishyouthebestfortherestofyourlifeFeltsorryforyouwhenlookedinyoureyesbutIneedto confessItoldyouali"
    E preencher o formulário com email válido
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Entao o usuário será cadastrado

Deve ser possivel cadastrar com email contendo 60 caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email contendo 60 caracteres
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Entao o usuário será cadastrado

Deve ser possivel cadastrar com senha contendo 12 caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E preencher o formulário com senha contendo 12 caracteres
    E clicar em Cadastrar
    Entao o usuário será cadastrado

Deve ser possivel cadastrar com nome contendo 1 caractere
    Dado que o usuário se encontra na página de cadastro
    E preencher o formulário com nome "A"
    E preencher o formulário com email válido
    E preencher o formulário com senha válida
    clicar em Cadastrar
    o usuário será cadastrado

Não deve ser possivel cadastrar com email já utilizado - mensagem de alerta deve ser exibida
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email já cadastrado
    E preencher o formulário com senha válida
    E confirmar
    Entao o usuário não será cadastrado e receberá um aviso "E-mail já cadastrado. Utilize outro e-mail"

Não deve ser possivel cadastrar se o campo nome estiver vazio
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com email válido
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Entao o usuário não será cadastrado e receberá um aviso "Informe o nome."

Não deve ser possivel cadastrar se o campo email estiver vazio
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Entao o usuário não será cadastrado e receberá um aviso "Informe o e-mail."

Não deve ser possivel cadastrar se o campo senha estiver vazio
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E clicar em Cadastrar
    Entao o usuário não será cadastrado e receberá um aviso "Informe a senha"

Não deve ser possivel cadastrar se todos campos estiverem vazios
    Dado que o usuário se encontra na página de cadastro
    Quando clicar em Cadastrar
    Entao o usuário não será cadastrado e receberá um aviso "Informe o nome"
    Entao o usuário não será cadastrado e receberá um aviso "Informe o e-mail"
    Entao o usuário não será cadastrado e receberá um aviso "Informe a senha"

Scenario Outline: Não deve ser possivel cadastrar com formato de email inválido
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email "<email>"
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Entao o usuário não será cadastrado e receberá um aviso "Informe um e-mail válido."
    Examples:
        | email          |
        | joca.com       |
        | ruivo!k!@.com  |
        | boi@boi        |
        | boi@car😁a.com |

Não deve ser possivel cadastrar com email contendo 61 ou mais caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email "IwishyouthebestfortherestofyourlifeFeltsorryfor@ouQuando l.oked"
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Entao o usuário não será cadastrado e receberá um aviso "O e-mail deve ter no máximo 60 dígitos."

Não deve ser possivel cadastrar com email contendo 4 ou menos caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email "a@c."
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Entao o usuário não será cadastrado e receberá um aviso "Informe pelo menos 5 dígitos para o e-mail"

Não deve ser possivel cadastrar com senha contendo 5 ou menos caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E preencher o formulário com senha "assdf"
    E confirmar a senha "assdf"
    E clicar em Cadastrar
    Entao o usuário não será cadastrado e receberá um aviso "A senha deve ter pelo menos 6 dígitos."

Não deve ser possivel cadastrar com senha contendo 13 ou mais caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E preencher o formulário com senha "kokoliupokjhn"
    E confirmar a senha "kokoliupokjhn"
    E clicar em Cadastrar
    Entao o usuário não será cadastrado e receberá um aviso "A senha deve ter no máximo 12 dígitos."

Não deve ser possivel cadastrar nome contendo 101 ou mais caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome "IwishyouthebestfortherestofyourlifeFeltsorryforyouQuando lookedinyoureyesbutIneedtoconfessItoldyoualiea"
    E preencher o formulário com email válido
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Entao o usuário não será cadastrado e receberá um aviso "O nome deve ter no máximo 100 dígitos."

Não deve ser possivel realizar o cadastro se a senha e confirmação da senha não forem iguais
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E preencher o formulário com senha "umdoistresq"
    E confirmar a senha "doistresumq"
    E clicar em Cadastrar
    Entao o usuário não será cadastrado e receberá um aviso "As senhas devem ser iguais."

Não deve ser possivel realizar o cadastro sem confirmar senha
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E preencher o formulário com senha "umdoistresq"
    E clicar em Cadastrar
    Entao o usuário não será cadastrado e receberá um aviso "Informe a senha"