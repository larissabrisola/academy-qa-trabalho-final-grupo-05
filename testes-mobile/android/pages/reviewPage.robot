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