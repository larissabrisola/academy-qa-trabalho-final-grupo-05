Feature: Avaliação de filmes

    Background: 
        Given 

    Scenario: Deve ser possível criar uma avaliação e atribuir uma nota para um filme
        When 
        And 
        Then 
    
    Scenario: Não deve ser possível criar uma avaliação para um filme
        When 
        And 
        Then 

    Scenario: Deve ser possível atribuir uma nota sem criar texto avaliativo
        When 
        And 
        Then 

    Scenario: Não deve ser possível duplicar uma avaliação
        Given que estou logado e autenticado no sistema
        When acessar meu perfil
        And selecionar uma avaliação feita anteriormente
        And atribuir nova avaliação
        Then a avaliação antiga será atualizada
        And não será possível criar nova avaliação
    
    Scenario: Deve ser possível escrever uma avaliação de até 500 caracteres
 
    Scenario: nota número inteiro? 