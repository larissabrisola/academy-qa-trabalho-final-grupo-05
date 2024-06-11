*** Settings ***
Resource    ..//base.robot



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

#Campos input
${inputNome}          ${prefixo}    android.widget.EditText[1]
${inputEmail}         ${prefixo}    android.widget.EditText[2]
${inputSenha}         ${prefixo}    android.widget.EditText[3]
${inputConfSenha}     ${prefixo}    android.widget.EditText[4]

# Faker
${nomeFaker}    FakerLibrary.Name

*** Keywords ***
Dado que o usuário se encontra na página de cadastro
    Wait Until Element Is Visible    ${buttonMenu}
    Clica e espera    ${buttonMenu}          ${buttonRegistrese}
    Clica e espera    ${buttonLogin}    //android.widget.ImageView/android.widget.EditText[1]
    Input Text    //android.widget.ImageView/android.widget.EditText[1]    Manoel
    sleep   10000
    Input Text    ${inputSenha}     Manoel
    Input Text    ${inputNome}    Manoel
    Input Text    ${inputConfSenha}    Manoel
    Sleep    1000

Quando preencher o formulário com nome válido
    Wait Until Element Is Visible    ${inputNome}
    Click Element    ${buttonRegistrar}
    Input Text    ${inputEmail}    Manoel
    Input Text    ${inputSenha}     Manoel
    Input Text    ${inputNome}    Manoel
    Input Text    ${inputConfSenha}    Manoel
    Sleep    1000