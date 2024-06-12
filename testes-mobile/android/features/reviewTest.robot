*** Settings ***
Test Setup    Abrir App
Test Teardown    TearDown
Resource    ..//base.robot

*** Test Cases ***
# Como um usuário da aplicação
# Desejo poder escrever avaliações sobre os filmes
# Para ser capaz de compartilhar minha opinião sobre os filmes

Deve ser possível criar uma avaliação e atribuir uma nota para um filme
    Dado acesso à tela de filmes
    Quando selecionar um filme qualquer
    E criar uma nova avaliação
    E confirmar operação
    Então será possível visualizar a avaliação criada

Não deve ser possível consultar avaliação do usuário sem estar logado
    Dado que acesso à tela de filmes
    Então não será possível criar uma avaliação
    E será possível visualizar a opção "Entre para poder escrever sua review"
    E serei encaminhado para a página de login

Não deve ser possível criar uma avaliação sem atribuir nota
    Dado que estou logado e na tela de um filme específico
    Quando inserir um texto de avaliação
    E concluir a operação
    Então não será possível criar uma avaliação
    E o sistema exibirá uma mensagem de alerta

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