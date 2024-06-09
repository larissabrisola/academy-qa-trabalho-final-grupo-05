*** Settings ***

Library    AppiumLibrary
Library    FakerLibrary
Library    XML

#resource
Resource    utils/config.robot
Resource    utils/commons.robot

Resource    pages/registerPage.robot
Resource    pages/loginPage.robot
Resource    pages/filmesPage.robot
