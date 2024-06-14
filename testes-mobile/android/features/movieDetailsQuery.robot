*** Settings ***
Test Setup    Abrir App
Test Teardown    TearDown
Resource    ..//base.robot


*** Test Cases ***
# Como uma pessoa qualquer acessando o sistema
# Desejo poder consultar mais detalhes de um filme
# Para poder visualizar todas as informações registradas para aquele filme

Deve ser possível visualizar todas as informações de um filme
    Dado que estou logado e na tela de filmes
    Quando selecionar um filme qualquer
    Entao tenho acesso à todas os detalhes do filme selecionado


Deve ser possível visualizar todas as informações de um filme sem estar logado
    Dado que estou na tela de filmes
    Quando selecionar um filme qualquer
    Entao tenho acesso à todas os detalhes do filme selecionado


Deve ser possível acessar a opção para avaliar filme
    Dado que estou logado e na tela de filmes
    Quando selecionar um filme qualquer
    Entao consigo criar uma avaliação

Deve ser possível visualizar informações de uma avaliação
    Dado que estou na tela de filmes
    Quando selecionar um filme qualquer
    Entao consigo visualizar todas os detalhes de uma avaliação

Deve ser possível visualizar informações de uma avaliação swipe
    Dado que me encontro na tela de filmes 
    Quando selecionar o filme criado
    Entao consigo visualizar todas os detalhes de uma avaliação