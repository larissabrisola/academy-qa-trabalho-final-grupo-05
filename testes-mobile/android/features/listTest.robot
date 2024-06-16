*** Settings ***
Resource            ..//base.robot

Test Setup          Abrir App
Test Teardown       TearDown


*** Test Cases ***
# Como uma pessoa qualquer acessando o sistema
# Desejo poder visualizar os filmes cadastrados
# Para poder analisar algumas informações dos filmes

Deve ser possivel visualizar titulo, descrição, capa e nota dos filmes
    Dado que existem filmes cadastrados
    Quando o usuário acessar a área de filmes
    Então o usuário poderá ver todos os dados do filme

Deve ser possível consultar mais detalhes do filme ao seleciona-lo
    Dado que existem filmes cadastrados
    Quando o usuário acessar a área de filmes
    E acessar um filme
    Então usuário será redirecionado para a tela de detalhes do filme
