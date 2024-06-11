Feature: Consulta de avaliações de usuário

    Scenario: Deve ser possível visualizar todas as avaliações feitas por mim
        Given que estou logado
        When acessar meu perfil
        Then visualizo nome, nota e texto avaliativo dos filmes avaliados

    Scenario: Deve ser possível visualizar as informações dos filmes avaliados
        Given que estou logado
        When acessar meu perfil
        And selecionar uma avaliação
        Then será possível visualizar os detalhes do filme avaliado

    Scenario: Deve ser possível acessar detalhes do filme para editar uma avaliação feita anteriormente
        Given que estou logado
        When acessar meu perfil
        And selecionar uma avaliação feita anteriormente
        Then será possível editar o comentário e a nota

    Scenario: Não deve ser possível duplicar uma avaliação
        Given que estou logado
        When acessar meu perfil
        And selecionar uma avaliação feita anteriormente
        And atribuir nova avaliação
        Then a avaliação antiga será atualizada
        And não será possível criar nova avaliação
    
    Scenario: Não deve ser possível consultar avaliação do usuário sem estar logado
        Given sou um usuário qualquer
        Then não tenho acesso à tela de perfil
        And não será possível consutar minha lista de avaliações
    
    Scenario: Deve exibir lista vazia se o usuário não realizou avaliaçoes
        Given que estou logado
        And não relizei avaliações previamente
        When acessar meu perfil
        Then visualizo a lista de avaliações em branco
    
    
