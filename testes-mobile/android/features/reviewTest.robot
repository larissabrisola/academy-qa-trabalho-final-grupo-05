*** Settings ***
Resource            ..//base.robot

Test Setup          Abrir App
Test Teardown       TearDown


*** Test Cases ***
# Como um usuário da aplicação
# Desejo poder escrever avaliações sobre os filmes
# Para ser capaz de compartilhar minha opinião sobre os filmes

Deve ser possível um usuário logado criar uma avaliaçao e atribuir uma nota para um filme
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
    Dado estou logado e na tela de um filme específico
    Quando atribuir uma nota
    E concluir a operação
    Então a nota é exibida e avaliação fica em branco

Não deve ser possível duplicar uma avaliação
    Dado que estou logado
    Quando acessar meu perfil
    E selecionar uma avaliação feita anteriormente
    E atribuir nova avaliação
    Então a avaliação antiga será atualizada
    E não será possível criar nova avaliação

Deve ser possível escrever uma avaliação com 500 caracteres
    Dado que estou logado e na tela de um filme específico
    Quando atribuir uma nota
    E inserir um texto avaliativo com 500 caracteres
    E concluir a operação
    Então a avaliação será criada
    E será possível visualizar a avaliação na tela do filme

Não deve ser possível escrever uma avaliação com mais que 500 caracteres
    Dado que estou logado e na tela de um filme específico
    Quando atribuir uma nota
    E inserir um texto avaliativo com mais de 500 caracteres
    E concluir a operação
    Então a avaliação não será criada
