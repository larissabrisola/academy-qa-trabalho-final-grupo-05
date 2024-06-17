Feature: Consulta de avaliações de usuário
    Como um usuário da aplicação
    Desejo poder consultar as avaliações feitas por mim
    Para poder ter um histórico de minhas avaliações
    
    Scenario: Deve ser possível visualizar todas as avaliações feitas por mim
        Given que estou logado e avaliei previamente um filme
        When acessar meu perfil
        Then visualizo nome, nota e texto avaliativo dos filmes avaliados

    Scenario: Deve ser possivel acessar detalhes dos filmes avaliados
        Given que estou logado e avaliei previamente um filme
        When acessar meu perfil
        And selecionar uma avaliação feita anteriormente
        Then será possível visualizar os detalhes do filme avaliado
 
    Scenario: Não deve ser possível duplicar uma avaliação, apenas editá-la
        Given que estou logado e avaliei previamente um filme
        When acessar meu perfil
        And selecionar uma avaliação feita anteriormente
        And e inserir novas informaçoes
        Then a avaliação antiga será atualizada

    Scenario: Não deve ser possível consultar avaliação do usuário sem estar logado
        Given sou um usuário qualquer
        Then não tenho acesso à tela de perfil e às avaliações
    
    Scenario: Deve exibir lista vazia se o usuário não realizou avaliaçoes
        Given que estou logado e não relizei avaliações previamente
        When acessar meu perfil
        Then visualizo a lista de avaliações em branco