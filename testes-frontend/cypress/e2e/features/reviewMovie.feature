Feature: Avaliação de filmes
    Como um usuário da aplicação
    Desejo poder escrever avaliações sobre os filmes
    Para ser capas de compartilhar minha opinião sobre os filmes
    
    Scenario: Deve ser possível criar uma avaliação e atribuir uma nota para um filme
        Given acesso à tela de filmes
        When selecionar um filme qualquer
        And criar uma nova avaliação
        And confirmar operação
        Then será possível visualizar a avaliação criada
    
    Scenario: Não deve ser possível consultar avaliação do usuário sem estar logado
        Given que acesso à tela de filmes
        Then não será possível criar uma avaliação
        And será possível visualizar a opção "Entre para poder escrever sua review"
        And serei encaminhado para a página de login
    
    Scenario: Não deve ser possível criar uma avaliação sem atribuir nota
        Given que estou logado e na tela de um filme específico
        When inserir um texto de avaliação
        And concluir a operação
        Then não será possível criar uma avaliação
        E o sistema exibirá uma mensagem de alerta

    Scenario: Deve ser possível atribuir uma nota sem criar texto avaliativo
        Given estou logado e na tela de um filme específico
        When atribuir uma nota
        And concluir a operação
        Then a nota é exibida e avaliação fica em branco

    Scenario: Não deve ser possível duplicar uma avaliação
        Given que estou logado
        When acessar meu perfil
        And selecionar uma avaliação feita anteriormente
        And atribuir nova avaliação
        Then a avaliação antiga será atualizada
        And não será possível criar nova avaliação
    
    Scenario: Deve ser possível escrever uma avaliação com 500 caracteres
        Given que estou logado e na tela de um filme específico
        When atribuir uma nota
        E inserir um texto avaliativo com 500 caracteres
        And concluir a operação
        Then a avaliação será criada
        E será possível visualizar a avaliação na tela do filme
    
    Scenario: Não deve ser possível escrever uma avaliação com mais que 500 caracteres
        Given que estou logado e na tela de um filme específico
        When atribuir uma nota
        And inserir um texto avaliativo com mais de 500 caracteres
        And concluir a operação
        Then a avaliação não será criada