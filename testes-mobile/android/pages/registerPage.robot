*** Settings ***
Resource    ..//base.robot



*** Variables ***

# prefixos
${prefixo}           xpath=//android.widget.ImageView/
${prefixoBTN}        xpath=//android.widget.Button
${prefixoErros}      xpath=//android.view.View

#botoes
${buttonRegistrar}    ${prefixoBTN}   [@content-desc="Registrar"]

#alertas
${informNome}         ${prefixoErros}    [@content-desc="Informe o nome."]
${informEmail}        ${prefixoErros}    [@content-desc="Informe o e-mail."]
${informSenha}        ${prefixoErros}    [@content-desc="Informe uma senha."]
${informConfSenha}    ${prefixoErros}    [@content-desc="Confirme a senha."]
${emailCadastrado}    ${prefixoErros}    [@content-desc="E-mail já cadastrado. Utilize outro e-mail."]
${cadastroRealizado}  ${prefixoErros}    [@content-desc="Cadastro realizado!"]

#Campos input
${inputNome}          ${prefixo}    android.widget.EditText[1]
${inputEmail}         ${prefixo}    android.widget.EditText[2]
${inputSenha}         ${prefixo}    android.widget.EditText[3]
${inputConfSenha}     ${prefixo}    android.widget.EditText[4]



*** Keywords ***