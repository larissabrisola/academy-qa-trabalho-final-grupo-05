*** Settings ***
Resource    ..//base.robot
Library    FakerLibrary


*** Variables ***

# prefixos
${prefixo}           xpath=//android.widget.ImageView/
${prefixoBTN}        xpath=//android.widget.Button
${prefixoView}      xpath=//android.view.View

#botoes
${buttonRegistrar}       ${prefixoBTN}     [@content-desc="Registrar"]
${buttonMenu}            ${prefixoBTN}     [@content-desc="Open navigation menu"]
${buttonRegistrese}      ${prefixoView}    [@content-desc="Registre-se"]
${buttonLogin}           ${prefixoView}    [@content-desc="Login"]
${buttonFilmes}          ${prefixoView}    [@content-desc="Filmes"]

#alertas
${informNome}         ${prefixoView}    [@content-desc="Informe o nome."]
${informEmail}        ${prefixoView}    [@content-desc="Informe o e-mail."]
${informSenha}        ${prefixoView}    [@content-desc="Informe uma senha."]
${informConfSenha}    ${prefixoView}    [@content-desc="Confirme a senha."]
${emailCadastrado}    ${prefixoView}    [@content-desc="E-mail já cadastrado. Utilize outro e-mail."]
${cadastroRealizado}  ${prefixoView}    [@content-desc="Cadastro realizado!"]
${erroEmailLongo}     ${prefixoView}    [@content-desc="Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde."]

#Campos input
${inputNome}          ${prefixo}    android.widget.EditText[1]
${inputEmail}         ${prefixo}    android.widget.EditText[2]
${inputSenha}         ${prefixo}    android.widget.EditText[3]
${inputConfSenha}     ${prefixo}    android.widget.EditText[4]

*** Keywords ***
Dado que o usuário se encontra na página de cadastro
    Wait Until Element Is Visible                  ${buttonMenu}
    Clica e espera    ${buttonMenu}                ${buttonRegistrese}
    Clica e espera    ${buttonRegistrese}          ${inputNome}

Quando preencher o formulário com nome válido
    ${nome}    FakerLibrary.Name
    Clica e digita       ${inputNome}    ${nome}


E preencher o formulário com email válido
    ${email}    FakerLibrary.Email
    Clica e digita    ${inputEmail}        ${email}

E preencher o formulário com email "a@c."
    Clica e digita    ${inputEmail}        a@c.

Quando preencher o formulário com email válido
    ${email}    FakerLibrary.Email
    Clica e digita    ${inputEmail}        ${email}

E preencher o formulário com senha válida
    Clica e digita    ${inputSenha}        123456
    Clica e digita    ${inputConfSenha}    123456

Quando clicar em Cadastrar
    Click Element    ${buttonRegistrar}

E clicar em Cadastrar
    Swipe By Percent    50    50    50    10
    Click Element    ${buttonRegistrar}

Entao o usuário será cadastrado
    Wait Until Element Is Visible    ${cadastroRealizado}
    Verifica contentDesc    ${cadastroRealizado}    Cadastro realizado!

Entao o usuário não será cadastrado e receberá um aviso "Informe o nome."
    Wait Until Element Is Visible    ${informNome}
    Verifica contentDesc    ${informNome}    Informe o nome.

Entao o usuário não será cadastrado e receberá um aviso "Informe o e-mail."
    Wait Until Element Is Visible    ${informEmail}
    Verifica contentDesc    ${informEmail}    Informe o e-mail.

Entao o usuário não será cadastrado e receberá um aviso "Informe uma senha."
    Wait Until Element Is Visible    ${informSenha}
    Verifica contentDesc    ${informSenha}        Informe uma senha.
    Verifica contentDesc    ${informConfSenha}    Confirme a senha.
Quando preencher o formulário com nome com 100 caracteres
    Clica e digita       ${inputNome}    IwishyouthebestfortherestofyourlifeFeltsorryforyouwhenlookedinyoureyesbutIneedto confessItoldyouali


    

E preencher o formulário com email contendo 60 caracteres
    ${parte1}    FakerLibrary.Random Digit
    ${parte2}    FakerLibrary.Random Digit
    ${parte3}    FakerLibrary.Random Digit
    ${parte4}    FakerLibrary.Random Digit
    
    Clica e digita       ${inputEmail}    ${parte1}emaillongo${parte2}comexatamente60caracteres${parte3}vaidarcerto${parte4}@gmail.com
E preencher o formulário com email contendo 61 caracteres
    Clica e digita   ${inputEmail}  emaildemasiadamentelongocommaisde60caracterespragerarerro@gmail.com

E preencher o formulário com senha contendo 12 caracteres
    Clica e digita    ${inputSenha}        123456654321
    Clica e digita    ${inputConfSenha}    123456654321

E preencher o formulário com nome "A"
    Clica e digita       ${inputNome}    A

Entao o usuário não será cadastrado e receberá um aviso "O e-mail deve ter no máximo 60 dígitos."
    Wait Until Element Is Visible    ${erroEmailLongo}
    Verifica contentDesc    ${erroEmailLongo}    Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.

Entao o usuário não será cadastrado e receberá um aviso "Informe pelo menos 5 dígitos para o e-mail"
    