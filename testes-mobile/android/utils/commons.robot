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