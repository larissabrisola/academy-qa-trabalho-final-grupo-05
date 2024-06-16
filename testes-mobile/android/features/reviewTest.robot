*** Settings ***
Resource            ..//base.robot

Test Setup          Abrir App
Test Teardown       TearDown


*** Test Cases ***
# Como um usuário da aplicação
# Desejo poder escrever avaliações sobre os filmes
# Para ser capaz de compartilhar minha opinião sobre os filmes

Deve ser possível um usuário logado criar uma avaliação e atribuir uma nota para um filme
    Dado que um usuário está na tela de filmes
    Quando selecionar um filme
    E criar uma nova avaliação
    E confirmar a avaliação
    Então será possível visualizar a avaliação criada

Não deve ser possivel um usuario não logado fazer uma avaliaçao
    Dado que acesso à tela de filmes
    Quando selecionar um filme
    E selecionar para adicionar uma avaliação
    E fazer as avaliações
    E confirmar a avaliação
    Então o sistema exibirá uma mensagem de alerta

Não deve ser possível criar uma avaliação sem atribuir nota
    Dado que um usuário está na tela de filmes
    Quando selecionar um filme
    E fazer uma avaliação sem informar a nota
    E confirmar a avaliação
    Então a avaliação não será feita

Deve ser possível atribuir uma nota sem criar texto avaliativo
    Dado que um usuário está na tela de filmes
    Quando selecionar um filme
    E fazer uma avaliação sem informar a texto
    E confirmar a avaliação
    Então será possível visualizar a avaliação criada

Não deve ser possível fazer uma segunda avaliação do mesmo filme
    Dado que um usuário está na tela de filmes
    Quando selecionar um filme
    E criar uma avaliação
    E fazer uma nova avaliação do mesmo filme
    Então somente a avaliação antiga será atualizada

Deve ser possível escrever uma avaliação com 500 caracteres
    Dado que um usuário está na tela de filmes
    Quando selecionar um filme
    E selecionar para adicionar uma avaliação
    E inserir um texto avaliativo com 500 caracteres
    E confirmar a avaliação
    Então será possível visualizar a avaliação criada

Não deve ser possível escrever uma avaliação com mais que 500 caracteres
    Dado que um usuário está na tela de filmes
    Quando selecionar um filme
    E selecionar para adicionar uma avaliação
    E inserir um texto avaliativo com 501 caracteres
    E confirmar a avaliação
    Então será possível visualizar a avaliação criada
