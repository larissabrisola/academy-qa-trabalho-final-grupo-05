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
    Então o usuário será cadastrado

Deve ser possivel cadastrar com nome contendo 100 caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome com 100 caracteres
    E preencher o formulário com email válido
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Então o usuário será cadastrado

Deve ser possivel cadastrar com email contendo 60 caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email contendo 60 caracteres
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Então o usuário será cadastrado

Deve ser possivel cadastrar com senha contendo 12 caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E preencher o formulário com senha contendo 12 caracteres
    E clicar em Cadastrar
    Então o usuário será cadastrado

Deve ser possivel cadastrar com nome contendo 1 caractere
    Dado que o usuário se encontra na página de cadastro
    E preencher o formulário com nome "A"
    E preencher o formulário com email válido
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Então o usuário será cadastrado
    
Deve ser possivel cadastrar o usuario com qualquer tipo de nome
    [Template]    Deve ser possivel cadastrar o usuario com qualquer tipo de nome
        пользователь
        usuario
        123456
        "!@#$%%
        😀😃😄😁😆

Não deve ser possivel cadastrar com email já utilizado - mensagem de alerta deve ser exibida
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email já cadastrado
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Então o usuário não será cadastrado e receberá um aviso "E-mail já cadastrado. Utilize outro e-mail"

Não deve ser possivel cadastrar se o campo nome estiver vazio
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com email válido
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Então o usuário não será cadastrado e receberá um aviso "Informe o nome."

Não deve ser possivel cadastrar se o campo email estiver vazio
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Então o usuário não será cadastrado e receberá um aviso "Informe o e-mail."

Não deve ser possivel cadastrar se o campo senha estiver vazio
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E clicar em Cadastrar
    Então o usuário não será cadastrado e receberá um aviso "Informe uma senha."

Não deve ser possivel cadastrar se todos campos estiverem vazios
    Dado que o usuário se encontra na página de cadastro
    Quando clicar em Cadastrar
    Então o usuário não será cadastrado e receberá um aviso "Informe o nome."
    Então o usuário não será cadastrado e receberá um aviso "Informe o e-mail."
    Então o usuário não será cadastrado e receberá um aviso "Informe uma senha."


Não deve ser possivel cadastrar com formato de email inválido
    [Template]    Não deve ser possivel cadastrar com formato de email inválido
        email          
        joca.com       
        ruivo!k!@.com  
        boi@boi        
        boi@car😁a.com 

Não deve ser possivel cadastrar com email contendo 61 ou mais caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email contendo 61 caracteres
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Então o usuário não será cadastrado e receberá um aviso de erro no cadastro

Não deve ser possivel cadastrar com email contendo 4 ou menos caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email "a@c.a"
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Então o usuário não será cadastrado e receberá um aviso de email invalido

Não deve ser possivel cadastrar com senha contendo 5 ou menos caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E preencher o formulário com senha com 5 digitos
    E confirmar a senha com 5 digitos
    E clicar em Cadastrar
    Então o usuário não será cadastrado e receberá um aviso de erro no cadastro

Não deve ser possivel cadastrar com senha contendo 13 ou mais caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E preencher o formulário com senha com 13 caracteres
    E confirmar a senha com 13 caracteres
    E clicar em Cadastrar
    Então o usuário não será cadastrado e receberá um aviso de erro no cadastro

Não deve ser possivel cadastrar nome contendo 101 ou mais caracteres
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome maior que 100 caracteres
    E preencher o formulário com email válido
    E preencher o formulário com senha válida
    E clicar em Cadastrar
    Então o usuário não será cadastrado e receberá um aviso de erro no cadastro

Não deve ser possivel realizar o cadastro se a senha e confirmação da senha não forem iguais
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E preencher o formulário com uma senha
    E confirmaçao de senha diferente
    E clicar em Cadastrar
    Então o usuário não será cadastrado e receberá um aviso "As senhas não coincidem."

Não deve ser possivel realizar o cadastro sem confirmar senha
    Dado que o usuário se encontra na página de cadastro
    Quando preencher o formulário com nome válido
    E preencher o formulário com email válido
    E preencher o formulário com uma senha
    E clicar em Cadastrar
    Então o usuário não será cadastrado e receberá um aviso "Confirme a senha."