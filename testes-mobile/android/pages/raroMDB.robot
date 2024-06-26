*** Settings ***
Resource    ..//base.robot
Library     Collections


*** Variables ***
# prefixos
${prefixo}                  xpath=//android.widget.ImageView/
${prefixoBTN}               xpath=//android.widget.Button
${prefixoView}              xpath=//android.view.View
${prefixoFrame}             xpath=//android.widget.FrameLayout

# Variados
${BASE_URL}                 https://raromdb-3c39614e42d4.herokuapp.com/api

# botoes
${buttonRegistrar}          ${prefixoBTN}    [@content-desc="Registrar"]
${buttonMenu}               ${prefixoBTN}    [@content-desc="Open navigation menu"]
${buttonRegistrese}         ${prefixoView}    [@content-desc="Registre-se"]
${buttonMenuLogin}          ${prefixoView}    [@content-desc="Login"]
${buttonFilmes}             ${prefixoView}    [@content-desc="Filmes"]
${buttonLogin}              ${prefixoBTN}    [@content-desc="Login"]
${buttonReview}             ${prefixoFrame}    [@resource-id="android:id/content"]
${1estrelas}
...                         ${prefixoFrame}
...                         [@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[1]
${2estrelas}
...                         ${prefixoFrame}
...                         [@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[2]
${3estrelas}
...                         ${prefixoFrame}
...                         [@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[3]
${4estrelas}
...                         ${prefixoFrame}
...                         [@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[4]
${5estrelas}
...                         ${prefixoFrame}
...                         [@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[5]
${buttonSalvar}             ${prefixoBTN}    [@content-desc="Salvar"]

# alertas
${informNome}               ${prefixoView}    [@content-desc="Informe o nome."]
${informEmail}              ${prefixoView}    [@content-desc="Informe o e-mail."]
${emailInvalidoErro}        ${prefixoView}    [@content-desc="Informe um e-mail válido."]
${informSenha}              ${prefixoView}    [@content-desc="Informe uma senha."]
${informConfSenha}          ${prefixoView}    [@content-desc="Confirme a senha."]
${senhasDiferentes}         ${prefixoView}    [@content-desc="As senhas não coincidem."]
${emailCadastrado}          ${prefixoView}    [@content-desc="E-mail já cadastrado. Utilize outro e-mail."]
${cadastroRealizado}        ${prefixoView}    [@content-desc="Cadastro realizado!"]
${erroRegInvalid}
...                         ${prefixoView}
...                         [@content-desc="Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde."]
${sucessoLogin}             ${prefixoView}    [@content-desc="Login realizado!"]
${userOuSenhaInvalido}      ${prefixoView}    [@content-desc="Usuário ou senha inválidos."]

# Campos input
${inputNome}                ${prefixo}    android.widget.EditText[1]
${inputEmail}               ${prefixo}    android.widget.EditText[2]
${inputSenha}               ${prefixo}    android.widget.EditText[3]
${inputConfSenha}           ${prefixo}    android.widget.EditText[4]

${inputEmailLogin}          ${prefixo}    android.widget.EditText[1]
${inputSenhaLogin}          ${prefixo}    android.widget.EditText[2]

${inputReview}              //android.widget.EditText

# Filmes
${reviewsAudience}          ${prefixoView}    [contains(@content-desc,"Avaliação da audiência")]
${reviewsCritic}            ${prefixoView}    [contains(@content-desc,"Avaliação da crítica")]

# Campo Filmes
${filme_home}               xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[1]
${button+atualizar}         xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button
${tela_avaliação}           xpath=//android.view.View[@content-desc="Avaliação da audiência 3 avaliações"]
${telaReview}               xpath=//android.view.View[@content-desc="Review"]
${texto_de_suaNota}         xpath=//android.view.View[@content-desc="Dê sua nota para o filme:"]

${inputTextAvalia}          xpath=//android.widget.EditText
${mensagemAlerta}           xpath=//android.view.View[@content-desc="Faça login e tente novamente."]
${mensagemAlertaSucesso}    xpath=//android.view.View[@content-desc="Sua review foi adicionada!"]
${mensagemAlertaSemNota}    xpath=//android.view.View[@content-desc="Não foi possível adicionar sua review."]


*** Keywords ***
Dado que o usuário se encontra na página de cadastro
    Wait Until Element Is Visible            ${buttonMenu}
    Clica e espera    ${buttonMenu}          ${buttonRegistrese}
    Clica e espera    ${buttonRegistrese}    ${inputNome}

Dado que acesso à tela de filmes
    Verifica primeiro filme
    Wait Until Element Is Visible            ${buttonMenu}
    Clica e espera    ${buttonMenu}          ${buttonFilmes}
    Clica e espera    ${buttonFilmes}        ${filme_home}

Dado que estou logado e na tela de filmes
    Cria Filme na api
    Verifica primeiro filme
    Wait Until Element Is Visible            ${buttonMenu}
    Clica e espera    ${buttonMenu}          ${buttonMenuLogin}
    Clica e espera    ${buttonMenuLogin}     ${inputEmailLogin}
    Clica e digita    ${inputEmailLogin}     ${email}
    Clica e digita    ${inputSenhaLogin}     123456
    Clica e espera    ${buttonLogin}         ${buttonMenu}

Dado que um usuário está na tela de filmes
    Cria Filme na api
    Verifica primeiro filme
    Wait Until Element Is Visible            ${buttonMenu}
    Clica e espera    ${buttonMenu}          ${buttonMenuLogin}
    Clica e espera    ${buttonMenuLogin}     ${inputEmailLogin}
    ${nome}    FakerLibrary.Name
    ${email}    FakerLibrary.Email
    Create Session    criar_sessao    ${BASE_URL}
    ${payload}    Create Dictionary    name=${nome}    email=${email}    password=123456
    ${response}    POST On Session    criar_sessao    /users    json=${payload}
    Should Be Equal As Numbers    ${response.status_code}    201

    Set Global Variable    ${nome}
    Clica e digita    ${inputEmailLogin}    ${email}
    Clica e digita    ${inputSenhaLogin}    123456
    Clica e espera    ${buttonLogin}    ${filme_home}

Dado que existem filmes cadastrados
    Cria Filme na api
    Verifica primeiro filme
    Cria Filme na api

Dado que usuário está na tela de login
    Wait Until Element Is Visible    ${buttonMenu}
    Clica e espera    ${buttonMenu}    ${buttonMenuLogin}
    Clica e espera    ${buttonMenuLogin}    ${inputEmailLogin}


Dado que estou na tela de filmes
    Cria review na api
    Clica e espera    ${buttonMenu}    ${buttonFilmes}
    Click Element     ${buttonFilmes}
    Critica Primeiro Filme
    Verifica primeiro filme

Dado que me encontro na tela de filmes 
    Cria review na api
    Clica e espera    ${buttonMenu}    ${buttonFilmes}
    Click Element     ${buttonFilmes}


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
#     Então o usuário será cadastrado
    Verifica contentDesc   ${cadastroRealizado}    Cadastro realizado!

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
#     Então o usuário não será cadastrado e receberá um aviso "Informe um e-mail válido."
    Verifica contentDesc   ${emailInvalidoErro}    Informe um e-mail válido.


Quando selecionar um filme
    ${filme}    Set Variable    //android.widget.ImageView[contains(@content-desc,"${tituloM}")]
    Wait Until Element Is Visible    ${filme}
    Click Element    ${filme}
    Wait Until Element Is Visible    ${button+atualizar}

Quando selecionar um filme qualquer
    ${filme}    Set Variable    //android.widget.ImageView[contains(@content-desc,"${tituloM}")]
    Wait Until Element Is Visible    ${filme}
    Click Element    ${filme}

Quando o usuário acessar a área de filmes
    Wait Until Element Is Visible    ${buttonMenu}
    Clica e espera    ${buttonMenu}    ${buttonFilmes}
    Clica e espera    ${buttonFilmes}    ${filme_home}

Quando selecionar o filme criado
    ${filme}=    Set Variable    //android.widget.ImageView[contains(@content-desc,"${tituloM}")]
    Swipe Until Element Is Visible    ${filme}    200
    Wait Until Element Is Visible    ${filme}
    Click Element    ${filme}

Quando preencher o formulário com email válido
    ${email}          FakerLibrary.Email
    Clica e digita    ${inputEmail}        ${email}

Quando clicar em Cadastrar
    Click Element    ${buttonRegistrar}

Quando preencher o formulário com nome com 100 caracteres
    Clica e digita     ${inputNome}    IwishyouthebestfortherestofyourlifeFeltsorryforyouwhenlookedinyoureyesbutIneedto confessItoldyouali

Quando preencher o formulário com nome maior que 100 caracteres
    clica e digita     ${inputNome}    IwishyouthebestfortherestofyourlifeFeltsorryforyouQuandolookedinyoureyesbutIneedtoconfessItoldyoualiea

Quando informar um email nao cadastrado
    ${email}          FakerLibrary.Email
    Clica e digita    ${inputEmailLogin}        em${email}

Quando preencher a senha corretamente
    Clica e digita    ${inputSenhaLogin}    123456

Quando clicar em Login
    Clica e espera    ${buttonLogin}    ${informEmail}

Quando preencher o formulário com nome válido
    ${nome}    FakerLibrary.Name
    Clica e digita    ${inputNome}    ${nome}

Quando informar email cadastrado
    ${nome}    FakerLibrary.Name

    ${email}    FakerLibrary.Email
    Create Session    criar_sessao    ${BASE_URL}
    ${payload}    Create Dictionary    name=${nome}    email=${email}    password=123456
    ${response}    POST On Session    criar_sessao    /users    json=${payload}
    Should Be Equal As Numbers    ${response.status_code}    201

    Clica e digita    ${inputEmailLogin}    ${email}


E inserir um texto avaliativo com 500 caracteres
    ${texto500}    FakerLibrary.Random Letters    500
    Click Element    ${3estrelas}
    Clica e digita    ${inputTextAvalia}    ${texto500}

E acessar um filme
    Verifica primeiro filme
    ${filme}    Set Variable    //android.widget.ImageView[contains(@content-desc,"${tituloM}")]
    Wait Until Element Is Visible    ${filme}
    Click Element    ${filme}

E inserir um texto avaliativo com 501 caracteres
    ${texto501}    FakerLibrary.Random Letters    501
    Click Element    ${3estrelas}
    Clica e digita    ${inputTextAvalia}     ${texto501}

E fazer uma avaliação sem informar a texto
    Clica e espera    ${button+atualizar}    ${telaReview}
    Click Element    ${3estrelas}

E selecionar para adicionar uma avaliação
    Clica e espera    ${button+atualizar}    ${telaReview}

E criar uma avaliação
    Clica e espera    ${button+atualizar}    ${telaReview}
    Click Element    ${3estrelas}
    Clica e digita    ${inputTextAvalia}    Malemá esse filme!
    E confirmar a avaliação
    Wait Until Element Is Visible    ${mensagemAlertaSucesso}
    Verifica contentDesc    ${mensagemAlertaSucesso}    Sua review foi adicionada!
    ${Nome_Review}    Set Variable    Por "${nome}" em 
    ${criticaDoFilme}    Set Variable
    ...    //android.widget.ImageView[contains(@content-desc, '${tituloM}')]//android.view.View[contains(@content-desc, '${Nome_Review}')]
    Press Keycode    4
    Press Keycode    4
    Wait Until Element Is Visible    ${button+atualizar}
    Swipe Until Element Is Visible    ${criticaDoFilme}    30
    Verifica contentDesc    ${criticaDoFilme}    ${Nome_Review}
    Verifica contentDesc    ${criticaDoFilme}    Malemá esse filme!

E fazer uma nova avaliação do mesmo filme
    E selecionar para adicionar uma avaliação
    Click Element    ${2estrelas}
    Clica e digita    ${inputTextAvalia}    Ahh! Não gostei muito não!
    E confirmar a avaliação

E fazer as avaliações
    Click Element    ${3estrelas}
    Clica e digita    ${inputTextAvalia}    Fazendo uma avaliação!

E confirmar a avaliação
    Click Element    ${buttonSalvar}

E fazer uma avaliação sem informar a nota
    Clica e espera    ${button+atualizar}   ${telaReview}
    Clica e digita    ${inputTextAvalia}    Não coloquei nenhuma nota HAHAHAHA!

E criar uma nova avaliação
    Clica e espera    ${button+atualizar}   ${telaReview}
    Click Element    ${3estrelas}
    Clica e digita    ${inputTextAvalia}    Podem ver pois eu gostei!!!

E preencher a senha corretamente
    Clica e digita    ${inputSenhaLogin}    123456

E preencher o formulário com email válido
    ${email}    FakerLibrary.Email
    Clica e digita    ${inputEmail}        ${email}

E clicar em Login
    Clica e espera    ${buttonLogin}       ${inputEmailLogin}

E preencher a senha incorretamente
    Clica e digita    ${inputSenhaLogin}   654321

E preencher o formulário com email "a@c.a"
    Clica e digita    ${inputEmail}        a@c.a

E preencher o formulário com senha válida
    Clica e digita    ${inputSenha}        123456
    Clica e digita    ${inputConfSenha}    123456

E preencher o formulário com email já cadastrado
    # Cria um usuario na api para o teste
    ${nome}    FakerLibrary.Name

    ${email}    FakerLibrary.Email
    Create Session    criar_sessao    ${BASE_URL}
    ${payload}    Create Dictionary    name=${nome}    email=${email}    password=123456
    ${response}    POST On Session    criar_sessao    /users    json=${payload}
    Should Be Equal As Numbers    ${response.status_code}    201

    Clica e digita    ${inputEmail}    ${email}

E clicar em Cadastrar
    Swipe By Percent    50    50    50    30
    Click Element    ${buttonRegistrar}

E preencher o formulário com email contendo 60 caracteres
    ${parte1}    FakerLibrary.Random Digit
    ${parte2}    FakerLibrary.Random Digit
    ${parte3}    FakerLibrary.Random Digit
    ${parte4}    FakerLibrary.Random Digit
    Clica e digita    ${inputEmail}    ${parte1}emaillongo${parte2}comexatamente60caracteres${parte3}vaidarcerto${parte4}@gmail.com

E preencher o formulário com email contendo 61 caracteres
    Clica e digita    ${inputEmail}        emaildemasiadamentelongocommaisde60caracterespragerarerro@gmail.com

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
    Clica e digita    ${inputNome}         A
    
E preencher o formulário com uma senha
    Clica e digita    ${inputSenha}        123456

E confirmaçao de senha diferente
    Clica e digita    ${inputConfSenha}    654321


Então tenho acesso à todas os detalhes do filme selecionado
    Wait Until Element Is Visible    ${reviewsAudience}
    ${tituloMovie}    Set Variable    //android.widget.ImageView[contains(@content-desc,"${tituloM}")]
    ${generoMovie}    Set Variable    //android.widget.ImageView[contains(@content-desc,"${genero}")]
    ${descMovie}    Set Variable      //android.widget.ImageView[contains(@content-desc,"${descricao}")]
    Verifica contentDesc    ${tituloMovie}    ${tituloM}
    Verifica contentDesc    ${generoMovie}    ${genero}
    Verifica contentDesc    ${descMovie}    ${descricao}

Então consigo criar uma avaliação
    Wait Until Element Is Visible    ${button+atualizar}
    Clica e espera                   ${button+atualizar}    ${1estrelas}
    Element Should Be Visible        ${1estrelas}
    Element Should Be Visible        ${2estrelas}
    Element Should Be Visible        ${3estrelas}
    Element Should Be Visible        ${4estrelas}
    Element Should Be Visible        ${5estrelas}
    Element Should Be Visible        ${inputReview}
    Element Should Be Visible        ${buttonSalvar}
    Element Attribute Should Match   ${inputReview}    hint    Escreva aqui o que você achou do filme.

Então consigo visualizar todas os detalhes de uma avaliação

    ${Nome_Review}    Set Variable       Por "${nomeUser}" em 
    ${criticaDoFilme}    Set Variable    //android.widget.ImageView[contains(@content-desc, '${tituloM}')]//android.view.View[contains(@content-desc, '${Nome_Review}')]
    Wait Until Element Is Visible        ${button+atualizar}
    Swipe Until Element Is Visible       ${criticaDoFilme}    15
    Verifica contentDesc    ${criticaDoFilme}         ${Nome_Review}
    Verifica contentDesc    ${criticaDoFilme}         ${review}

Então o login é realizado com sucesso
    Verifica contentDesc    ${sucessoLogin}           Login realizado!

Então o usuário não será cadastrado e receberá um aviso "Informe o nome."

    Verifica contentDesc    ${informNome}             Informe o nome.

Então o usuário não será cadastrado e receberá um aviso "Informe uma senha."
    Verifica contentDesc    ${informSenha}            Informe uma senha.
    Verifica contentDesc    ${informConfSenha}        Confirme a senha.

Então o usuário não será cadastrado e receberá um aviso "As senhas não coincidem."
    Verifica contentDesc    ${senhasDiferentes}       As senhas não coincidem.

Então o usuário não será cadastrado e receberá um aviso "Confirme a senha."
    Verifica contentDesc    ${informConfSenha}        Confirme a senha.

Então o login não é realizado e a mensagem "Usuário ou senha inválidos." é exibida
    Verifica contentDesc    ${userOuSenhaInvalido}    Usuário ou senha inválidos.

Então o login não é realizado e uma mensagem deve ser exibida "Informe o e-mail."
    Verifica contentDesc    ${informEmail}            Informe o e-mail.
Então o login não é realizado e uma mensagem deve ser exibida "Informe a senha"
    Verifica contentDesc    ${informSenha}            Informe uma senha.

Então será possível visualizar a avaliação criada
    Wait Until Element Is Visible     ${mensagemAlertaSucesso}
    Verifica contentDesc              ${mensagemAlertaSucesso}    Sua review foi adicionada!
    ${Nome_Review}    Set Variable    Por "${nome}" em 
    ${criticaDoFilme}    Set Variable
    ...    //android.widget.ImageView[contains(@content-desc, '${tituloM}')]//android.view.View[contains(@content-desc, '${Nome_Review}')]
    Press Keycode    4
    Press Keycode    4
    Wait Until Element Is Visible     ${button+atualizar}
    Swipe Until Element Is Visible    ${criticaDoFilme}    30
    Verifica contentDesc              ${criticaDoFilme}    ${Nome_Review}
    Verifica contentDesc              ${criticaDoFilme}    Podem ver pois eu gostei!!!

Então somente a avaliação antiga será atualizada
    Wait Until Element Is Visible     ${mensagemAlertaSucesso}
    Verifica contentDesc              ${mensagemAlertaSucesso}    Sua review foi adicionada!
    ${Nome_Review}    Set Variable    Por "${nome}" em 
    ${criticaDoFilme}    Set Variable
    ...    //android.widget.ImageView[contains(@content-desc, '${tituloM}')]//android.view.View[contains(@content-desc, '${Nome_Review}')]
    Press Keycode    4
    Press Keycode    4
    Wait Until Element Is Visible     ${button+atualizar}
    Swipe Until Element Is Visible    ${criticaDoFilme}    15
    Verifica contentDesc              ${criticaDoFilme}    ${Nome_Review}
    Verifica contentDesc              ${criticaDoFilme}    Ahh! Não gostei muito não!
    

Então usuário será redirecionado para a tela de detalhes do filme
    Wait Until Element Is Visible     ${reviewsAudience}
    ${tituloMovie}    Set Variable    //android.widget.ImageView[contains(@content-desc,"${tituloM}")]
    ${generoMovie}    Set Variable    //android.widget.ImageView[contains(@content-desc,"${genero}")]
    ${descMovie}    Set Variable      //android.widget.ImageView[contains(@content-desc,"${descricao}")]
    Verifica contentDesc              ${tituloMovie}    ${tituloM}
    Verifica contentDesc              ${generoMovie}    ${genero}
    Verifica contentDesc              ${descMovie}      ${descricao}

Então a avaliação não será feita
    Wait Until Element Is Visible     ${mensagemAlertaSemNota}
    Verifica contentDesc              ${mensagemAlertaSemNota}    Não foi possível adicionar sua review.


Então o usuário poderá ver todos os dados do filme
    Verifica primeiro filme
    ${filme}    Set Variable    //android.widget.ImageView[contains(@content-desc,"${tituloM}")]
    Wait Until Element Is Visible     ${filme}
    Verifica contentDesc              ${filme}    ${tituloM}
    Verifica contentDesc              ${filme}    ${descricao}
    Verifica segundo filme
    ${filme}    Set Variable    //android.widget.ImageView[contains(@content-desc,"${tituloM}")]
    Wait Until Element Is Visible     ${filme}
    Verifica contentDesc              ${filme}    ${tituloM}
    Verifica contentDesc              ${filme}    ${descricao}

Então o usuário não será cadastrado e receberá um aviso de erro no cadastro
    Verifica contentDesc             ${erroRegInvalid}    Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.

Então o usuário não será cadastrado e receberá um aviso de email invalido
    Verifica contentDesc             ${emailInvalidoErro}    Informe um e-mail válido.

Então o usuário não será cadastrado e receberá um aviso "Informe o e-mail."
    Verifica contentDesc             ${informEmail}    Informe o e-mail.

Então o usuário não será cadastrado e receberá um aviso "E-mail já cadastrado. Utilize outro e-mail"
    Verifica contentDesc             ${emailCadastrado}    E-mail já cadastrado. Utilize outro e-mail.

Então o usuário será cadastrado
    Verifica contentDesc             ${cadastroRealizado}    Cadastro realizado!

Então o sistema exibirá uma mensagem de alerta
    Wait Until Element Is Visible    ${mensagemAlerta}
    Verifica contentDesc             ${mensagemAlerta}    Faça login e tente novamente.
    Element Should Be Visible        ${mensagemAlerta}
