*** Settings ***
Test Setup    Abrir App
Test Teardown    TearDown
Resource    ..//base.robot


*** Test Cases ***
# Como uma pessoa qualquer acessando o sistema
# Desejo poder consultar mais detalhes de um filme
# Para poder visualizar todas as informações registradas para aquele filme
#TODO
Deve ser possível visualizar todas as informações de um filme
    Dado que estou logado e na tela de filmes
    Quando selecionar um filme qualquer
    Quando tenho acesso à todas aos detalhes do filme selecionado

#TODO USAR API CRIAR FILME E VERIFICAR OS DADOS
Deve ser possível visualizar todas as informações de um filme sem estar logado
    Dado que estou na tela de filmes
    Quando selecionar um filme qualquer
    Quando tenho acesso à todas aos detalhes do filme selecionado

#TODO UsAR API CRIAR 2 AVALIAÇÃO E VER MEDIA
Deve ser possível visualizar a soma das avaliações da audiência
    Dado que estou na tela de filmes
    Quando selecionar um filme qualquer
    Quando consigo visualizar a média das avaliações da audiência
#TODO UsAR API CRIAR 2 AVALIAÇÃO CRITICA E VER MEDIA
Deve ser possível visualizar a média das avaliações da crítica
    Dado que estou na tela de filmes
    Quando selecionar um filme qualquer
    Quando consigo visualizar a média das avaliações da crítica

#TODO ENTRAR NA AVALIAÇÃO E VER OS CAMPOS
Deve ser possível acessar a opção para avaliar filme
    Dado que estou logado e na tela de filmes
    Quando selecionar um filme qualquer
    Quando consigo criar uma avaliação
#USAR PAI CRIAR AVALIAÇÃO E COMPARA OS DADOS
Deve ser possível visualizar informações de uma avaliação
    Dado que estou na tela de filmes
    Quando selecionar um filme qualquer
    Quando consigo visualizar todas os detalhes de uma avaliação