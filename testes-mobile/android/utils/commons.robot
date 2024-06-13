*** Settings ***

Resource    ../base.robot

Library    Process

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
    #cria usuario pela API
    ${nome}    FakerLibrary.Name
    ${email}   FakerLibrary.Email
    Create Session  criar_sessao  ${BASE_URL}
    ${payload}=  Create Dictionary  name=${nome}  email=${email}  password=123456
    ${response}=  POST On Session  criar_sessao  /users  json=${payload}
    Should Be Equal As Numbers  ${response.status_code}  201
    
    #Loga usuario pela API
    ${payloadLogin}=    Create Dictionary    email=${email}  password=123456
    ${responseLogin}=  POST On Session  criar_sessao  /auth/login  json=${payloadLogin}
    ${token}=   Get Dictionary Items   ${responseLogin.json()}    accessToken
    ${token}=   Get From List    ${token}    1

    #Promove Usuario Admin 
    ${headers}=    Create Dictionary    Authorization=Bearer ${token}    Content-Type=application/json
    ${responseLogin}=  PATCH On Session  criar_sessao  /users/admin    headers=${headers}    json=${payloadLogin}
    
    #Cria filme na API
    ${basetitle}=    FakerLibrary.First Name 
    ${title}=    Set Variable    a volta de ${basetitle}
    ${description}=    FakerLibrary.Catch Phrase
    ${duration}=    Convert To Integer    120
    ${releaseYear}=    Convert To Integer    1999
    ${payloadFilme}=    Create Dictionary    title=${title}    genre=Terror    description=${description}    durationInMinutes=${duration}    releaseYear=${releaseYear}
    ${responseFilme}=    POST On Session    criar_sessao    /movies     headers=${headers}    json=${payloadFilme}
    Set Global Variable    ${title}
    Set Global Variable    ${description}

Swipe Until Element Is Visible
    [Arguments]    ${locator}    ${text}    ${limit}
    FOR    ${counter}    IN RANGE    ${limit}
        ${is_visible}=    Run Keyword And Return Status    Element Should Contain Text    ${locator}    ${text}
        Exit For Loop If    ${is_visible}
        Swipe By Percent    50    80    50    10
    END
    Run Keyword If    not ${is_visible}    Fail    Element '${text}' not found after ${limit} swipes