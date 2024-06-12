*** Settings ***
Resource    ..//base.robot

*** Variables ***

# prefixos
${prefixo}           xpath=//android.widget.ImageView/
${prefixoBTN}        xpath=//android.widget.Button
${prefixoView}       xpath=//android.view.View

#Variados
${BASE_URL}              https://raromdb-3c39614e42d4.herokuapp.com/api

#botoes
${buttonRegistrar}       ${prefixoBTN}     [@content-desc="Registrar"]
${buttonMenu}            ${prefixoBTN}     [@content-desc="Open navigation menu"]
${buttonRegistrese}      ${prefixoView}    [@content-desc="Registre-se"]
${buttonLogin}           ${prefixoView}    [@content-desc="Login"]
${buttonFilmes}          ${prefixoView}    [@content-desc="Filmes"]

#alertas
${informNome}            ${prefixoView}    [@content-desc="Informe o nome."]
${informEmail}           ${prefixoView}    [@content-desc="Informe o e-mail."]
${emailInvalidoErro}     ${prefixoView}    [@content-desc="Informe um e-mail válido."]
${informSenha}           ${prefixoView}    [@content-desc="Informe uma senha."]
${informConfSenha}       ${prefixoView}    [@content-desc="Confirme a senha."]
${senhasDiferentes}      ${prefixoView}    [@content-desc="As senhas não coincidem."]
${emailCadastrado}       ${prefixoView}    [@content-desc="E-mail já cadastrado. Utilize outro e-mail."]
${cadastroRealizado}     ${prefixoView}    [@content-desc="Cadastro realizado!"]
${erroRegInvalid}        ${prefixoView}    [@content-desc="Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde."]

#Campos input
${inputNome}             ${prefixo}        android.widget.EditText[1]
${inputEmail}            ${prefixo}        android.widget.EditText[2]
${inputSenha}            ${prefixo}        android.widget.EditText[3]
${inputConfSenha}        ${prefixo}        android.widget.EditText[4]

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

E preencher o formulário com email "a@c.a"
    Clica e digita    ${inputEmail}        a@c.a

Quando preencher o formulário com email válido
    ${email}    FakerLibrary.Email
    Clica e digita    ${inputEmail}        ${email}

E preencher o formulário com senha válida
    Clica e digita    ${inputSenha}        123456
    Clica e digita    ${inputConfSenha}    123456

E preencher o formulário com email já cadastrado
    #Cria um usuario na api para o teste
    ${nome}    FakerLibrary.Name
    ${email}   FakerLibrary.Email
    Create Session  criar_sessao  ${BASE_URL}
    ${payload}=  Create Dictionary  name=${nome}  email=${email}  password=123456
    ${response}=  POST On Session  criar_sessao  /users  json=${payload}
    Should Be Equal As Numbers  ${response.status_code}  201
    
    Clica e digita    ${inputEmail}        ${email}

Entao o usuário não será cadastrado e receberá um aviso "E-mail já cadastrado. Utilize outro e-mail"
    Verifica contentDesc    ${emailCadastrado}    E-mail já cadastrado. Utilize outro e-mail.


Quando clicar em Cadastrar
    Click Element    ${buttonRegistrar}

E clicar em Cadastrar
    Swipe By Percent    50    50    50    20
    Click Element    ${buttonRegistrar}

Entao o usuário será cadastrado
    Verifica contentDesc    ${cadastroRealizado}    Cadastro realizado!

Entao o usuário não será cadastrado e receberá um aviso "Informe o nome."

    Verifica contentDesc    ${informNome}    Informe o nome.

Entao o usuário não será cadastrado e receberá um aviso "Informe o e-mail."

    Verifica contentDesc    ${informEmail}    Informe o e-mail.

Entao o usuário não será cadastrado e receberá um aviso "Informe uma senha."
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
Quando preencher o formulário com nome maior que 100 caracteres
    clica e digita    ${inputNome}    IwishyouthebestfortherestofyourlifeFeltsorryforyouQuandolookedinyoureyesbutIneedtoconfessItoldyoualiea
E preencher o formulário com email contendo 61 caracteres
    Clica e digita    ${inputEmail}  emaildemasiadamentelongocommaisde60caracterespragerarerro@gmail.com

E preencher o formulário com senha contendo 12 caracteres
    Clica e digita    ${inputSenha}        123456654321
    Clica e digita    ${inputConfSenha}    123456654321

E preencher o formulário com senha com 5 digitos
    Clica e digita    ${inputSenha}        12345
    
E confirmar a senha com 5 digitos
    Clica e digita    ${inputConfSenha}    12345

E preencher o formulário com senha com 13 caracteres
    Clica e digita    ${inputSenha}        1234566541230
E confirmar a senha com 13 caracteres
    Clica e digita    ${inputConfSenha}    1234566541230

E preencher o formulário com nome "A"
    Clica e digita       ${inputNome}    A

Entao o usuário não será cadastrado e receberá um aviso de erro no cadastro
    Verifica contentDesc    ${erroRegInvalid}    Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.

Entao o usuário não será cadastrado e receberá um aviso de email invalido
    Verifica contentDesc   ${emailInvalidoErro}    Informe um e-mail válido.

Entao o usuário não será cadastrado e receberá um aviso "As senhas não coincidem."
    Verifica contentDesc    ${senhasDiferentes}   As senhas não coincidem.

Entao o usuário não será cadastrado e receberá um aviso "Confirme a senha."
    Verifica contentDesc    ${informConfSenha}   Confirme a senha.
E preencher o formulário com uma senha
    Clica e digita    ${inputSenha}    123456

E confirmarçao de senha diferente
    Clica e digita    ${inputConfSenha}   654321



Não deve ser possivel cadastrar com formato de email inválido
    [Arguments]    ${email}
#   Dado que o usuário se encontra na página de cadastro
    Wait Until Element Is Visible                  ${buttonMenu}
    Clica e espera    ${buttonMenu}                ${buttonRegistrese}
    Clica e espera    ${buttonRegistrese}          ${inputNome}
#   Quando preencher o formulário com nome válido
    ${nome}    FakerLibrary.Name
    Clica e digita       ${inputNome}    ${nome}
#   E preencher o formulário com email 
    Clica e digita    ${inputEmail}      ${email}
#     E preencher o formulário com senha válida
    Clica e digita    ${inputSenha}        123456
    Clica e digita    ${inputConfSenha}    123456
#     E clicar em Cadastrar
    Swipe By Percent    50    50    50    20
    Click Element    ${buttonRegistrar}
#     Entao o usuário não será cadastrado e receberá um aviso "Informe um e-mail válido."
    Verifica contentDesc   ${emailInvalidoErro}    Informe um e-mail válido.


Deve ser possivel cadastrar o usuario com qualquer tipo de nome
    [Arguments]    ${nome}
#   Dado que o usuário se encontra na página de cadastro
    Wait Until Element Is Visible                  ${buttonMenu}
    Clica e espera    ${buttonMenu}                ${buttonRegistrese}
    Clica e espera    ${buttonRegistrese}          ${inputNome}
#   Quando preencher o formulário com qualquer tipo de nome
    Clica e digita       ${inputNome}    ${nome}
#   E preencher o formulário com email 
    ${email}    FakerLibrary.Email
    Clica e digita    ${inputEmail}      ${email}
#     E preencher o formulário com senha válida
    Clica e digita    ${inputSenha}        123456
    Clica e digita    ${inputConfSenha}    123456
#     E clicar em Cadastrar
    Swipe By Percent    50    50    50    20
    Click Element    ${buttonRegistrar}
#     Entao o usuário será cadastrado
    Verifica contentDesc   ${cadastroRealizado}    Cadastro realizado!