*** Settings ***

Resource    ../base.robot


*** Keywords ***
Clica e espera
    [Arguments]    ${elementoAClicar}    ${elementoEsperado}
    Click Element    ${elementoAClicar}
    Wait Until Element Is Visible    ${elementoEsperado}