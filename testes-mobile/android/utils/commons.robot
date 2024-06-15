*** Settings ***
Resource    ../base.robot
Library     Process


*** Keywords ***
Clica e espera
    [Arguments]    ${elementoAClicar}    ${elementoEsperado}
    Click Element    ${elementoAClicar}
    Wait Until Element Is Visible    ${elementoEsperado}

Clica e digita
    [Arguments]    ${elementoAClicar}    ${texto}
    Click Element    ${elementoAClicar}
    Click Element    ${elementoAClicar}
    Input Text    ${elementoAClicar}    ${texto}

Verifica contentDesc
    [Arguments]    ${elemento}    ${conteudo}
    Wait Until Element Is Visible    ${elemento}
    Element Should Be Visible    ${elemento}
    ${contentDesc}=    AppiumLibrary.Get Element Attribute    ${elemento}    content-desc
    Should Contain    ${contentDesc}    ${conteudo}

Cria Filme na api
    # cria usuario pela API
    ${nome}=    FakerLibrary.Name
    ${email}=    FakerLibrary.Email
    Create Session    criar_sessao    ${BASE_URL}
    ${payload}=    Create Dictionary    name=${nome}    email=${email}    password=123456
    ${response}=    POST On Session    criar_sessao    /users    json=${payload}
    Should Be Equal As Numbers    ${response.status_code}    201

    # Loga usuario pela API
    ${payloadLogin}=    Create Dictionary    email=${email}    password=123456
    ${responseLogin}=    POST On Session    criar_sessao    /auth/login    json=${payloadLogin}
    ${token}=    Get Dictionary Items    ${responseLogin.json()}    accessToken
    ${token}=    Get From List    ${token}    1

    # Promove Usuario Admin
    ${headers}=    Create Dictionary    Authorization=Bearer ${token}    Content-Type=application/json
    ${responseLogin}=    PATCH On Session    criar_sessao    /users/admin    headers=${headers}    json=${payloadLogin}

    # Cria filme na API
    ${basetitle}=    FakerLibrary.First Name
    ${title}=    Set Variable    a volta de ${basetitle}
    ${description}=    FakerLibrary.Catch Phrase
    ${duration}=    Convert To Integer    120
    ${releaseYear}=    Convert To Integer    1999
    ${payloadFilme}=    Create Dictionary
    ...    title=${title}
    ...    genre=Terror
    ...    description=${description}
    ...    durationInMinutes=${duration}
    ...    releaseYear=${releaseYear}
    ${responseFilme}=    POST On Session    criar_sessao    /movies    headers=${headers}    json=${payloadFilme}
    Set Global Variable    ${email}
    Set Global Variable    ${title}
    Set Global Variable    ${description}

Cria review na api
    # cria usuario pela API
    ${nomeUser}=    FakerLibrary.Name
    ${email}=    FakerLibrary.Email
    Create Session    criar_sessao    ${BASE_URL}
    ${payload}=    Create Dictionary    name=${nomeUser}    email=${email}    password=123456
    ${response}=    POST On Session    criar_sessao    /users    json=${payload}
    Should Be Equal As Numbers    ${response.status_code}    201

    # Loga usuario pela API
    ${payloadLogin}=    Create Dictionary    email=${email}    password=123456
    ${responseLogin}=    POST On Session    criar_sessao    /auth/login    json=${payloadLogin}
    ${token}=    Get Dictionary Items    ${responseLogin.json()}    accessToken
    ${token}=    Get From List    ${token}    1

    # Promove Usuario Admin
    ${headers}=    Create Dictionary    Authorization=Bearer ${token}    Content-Type=application/json
    ${responseAdmin}=    PATCH On Session    criar_sessao    /users/admin    headers=${headers}

    # Cria filme na API
    ${basetitle}=    FakerLibrary.First Name
    ${title}=    Set Variable    a volta de ${basetitle}
    ${description}=    FakerLibrary.Catch Phrase
    ${duration}=    Convert To Integer    120
    ${releaseYear}=    Convert To Integer    1999
    ${payloadFilme}=    Create Dictionary
    ...    title=${title}
    ...    genre=Terror
    ...    description=${description}
    ...    durationInMinutes=${duration}
    ...    releaseYear=${releaseYear}
    ${responseFilme}=    POST On Session    criar_sessao    /movies    headers=${headers}    json=${payloadFilme}
    ${idFilme}=    Get Dictionary Items    ${responseFilme.json()}
    ${idFilme}=    Get From List    ${idFilme}    7

    # Criar uma review
    ${score}=    Convert to Integer    5
    ${review}=    Set Variable    Esta com certeza é uma review valida
    ${payloadReview}=    Create Dictionary    movieId=${idFilme}    score=${score}    reviewText=${review}
    ${responseReview}=    POST On Session
    ...    criar_sessao
    ...    /users/review
    ...    headers=${headers}
    ...    json=${payloadReview}
    Set Global Variable    ${nomeUser}
    Set Global Variable    ${email}
    Set Global Variable    ${title}
    Set Global Variable    ${description}
    Set Global Variable    ${review}

Critica Primeiro Filme
    Verifica primeiro filme
    ${nomeUser}=    FakerLibrary.Name
    ${email}=    FakerLibrary.Email
    Create Session    criar_sessao    ${BASE_URL}
    ${payload}=    Create Dictionary    name=${nomeUser}    email=${email}    password=123456
    ${response}=    POST On Session    criar_sessao    /users    json=${payload}
    Should Be Equal As Numbers    ${response.status_code}    201
    ${payloadLogin}=    Create Dictionary    email=${email}    password=123456
    ${responseLogin}=    POST On Session    criar_sessao    /auth/login    json=${payloadLogin}
    ${token}=    Get Dictionary Items    ${responseLogin.json()}    accessToken
    ${token}=    Get From List    ${token}    1
    ${score}=    Convert to Integer    5
    ${review}=    Set Variable    Pensao num filmao
    ${headers}=    Create Dictionary    Authorization=Bearer ${token}    Content-Type=application/json
    ${payloadReview}=    Create Dictionary    movieId=${idMovie}    score=${score}    reviewText=${review}
    ${responseReview}=    POST On Session
    ...    criar_sessao
    ...    /users/review
    ...    headers=${headers}
    ...    json=${payloadReview}
    Set Global Variable    ${nomeUser}
    Set Global Variable    ${email}
    Set Global Variable    ${title}
    Set Global Variable    ${description}
    Set Global Variable    ${review}

Verifica primeiro filme
    Create Session    criar_sessao    ${BASE_URL}
    ${response}=    GET On Session    criar_sessao    /movies
    ${primeiroFilme}=    Get From List    ${response.json()}    1
    ${lista}=    Get Dictionary Items    ${primeiroFilme}    0
    ${idMovie}=    Get From List    ${lista}    1
    ${tituloM}=    Get From List    ${lista}    3
    ${genero}=    Get From List    ${lista}    5
    ${descricao}=    Get From List    ${lista}    7
    ${idMovie}=    Convert to Integer    ${idMovie}
    Set Global Variable    ${tituloM}
    Set Global Variable    ${idMovie}
    Set Global Variable    ${genero}
    Set Global Variable    ${descricao}

Swipe Until Element Is Visible
    [Arguments]    ${locator}    ${limit}
    FOR    ${counter}    IN RANGE    ${limit}
        ${is_visible}=    Run Keyword And Return Status    Element Should Be Visible    ${locator}
        IF    ${is_visible}    BREAK
        Swipe By Percent    50    80    50    10
    END

Data de hoje
    ${DATE_FORMAT}=    Set Variable    %d/%m/%Y
    ${Data_atual}=    Get Current Date    result_format=${DATE_FORMAT}
    Set Global Variable    ${Data_atual}
