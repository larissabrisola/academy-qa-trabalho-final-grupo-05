Feature: Avaliação de filmes
    Como um usuário da aplicação
    Desejo poder escrever avaliações sobre os filmes
    Para ser capas de compartilhar minha opinião sobre os filmes
    
    Scenario: Deve ser possível criar uma avaliação e atribuir uma nota para um filme
        Given que estou logado e na tela de um filme específico
        When criar uma nova avaliação
        And concluir operação
        Then será possível visualizar imediatamente a avaliação criada
    
    Scenario: Não deve ser possível criar avaliação do usuário sem estar logado
        Given que acesso à tela de filmes
        When buscar e selecionar um filme específico
        Then será possível visualizar a opção "Entre para poder escrever sua review"
        And o sistema encaminhará para a tela de login
    
    Scenario: Não deve ser possível criar uma avaliação sem atribuir nota
        Given que estou logado e na tela de um filme específico
        When inserir um texto de avaliação
        And concluir operação
        Then não será possível criar uma avaliação

    Scenario: Deve ser possível atribuir uma nota sem criar texto avaliativo
        Given que estou logado e na tela de um filme específico
        When atribuir uma nota
        And concluir operação
        Then a nota é exibida e avaliação fica em branco
    
    Scenario: Deve ser possivel apenas editar uma avaliação, sem duplicá-la
        Given que fiz a avaliação de um filme
        When reescrever nova avaliação
        And concluir operação
        Then a avaliação antiga será atualizada
    
    Scenario: Deve ser possível escrever uma avaliação com 500 caracteres
        Given que estou logado e na tela de um filme específico
        When atribuir uma nota
        And inserir um texto avaliativo com 500 caracteres
        And concluir operação
        Then será possível visualizar imediatamente a avaliação criada
    
    Scenario: Não deve ser possível escrever uma avaliação com 501 ou mais caracteres
        Given que estou logado e na tela de um filme específico
        When atribuir uma nota
        And inserir um texto avaliativo com mais de 500 caracteres
        And concluir operação
        Then a avaliação não será enviada