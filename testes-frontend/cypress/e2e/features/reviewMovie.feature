Feature: Avaliação de filmes

    Background: 
        Given 

    Scenario: Deve ser possível criar uma avaliação e atribuir uma nota para um filme
        When 
        And 
        Then 
    
    Scenario: Não deve ser possível consultar avaliação do usuário sem estar logado
        Given quando acesso à tela de filmes
        When selecionar um filme qualquer
        Then não será possível criar uma avaliação
        And será possível visualizar a opção "Entre para poder escrever sua review"
        And serei encaminhado para a página de login

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
    
    Scenario: Deve ser possível escrever uma avaliação de até 500 caracteres
 
    Scenario: nota número inteiro? 