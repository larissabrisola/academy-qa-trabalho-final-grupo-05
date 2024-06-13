Feature: Consulta de avaliações de usuário
    Como um usuário da aplicação
    Desejo poder consultar as avaliações feitas por mim
    Para poder ter um histórico de minhas avaliações
    
    @ignore 
    @login
    Scenario: Deve ser possível visualizar todas as avaliações feitas por mim
        Given que estou logado e avaliei previamente um filme
        When acessar meu perfil
        Then visualizo nome, nota e texto avaliativo dos filmes avaliados

    # @ignore @login
    Scenario: Deve ser possível visualizar as informações dos filmes avaliados
        Given que estou logado e avaliei previamente um filme
        When acessar meu perfil
        And selecionar uma avaliação anteriormente
        Then será possível visualizar os detalhes do filme avaliado

    @ignore @login
    Scenario: Deve ser possível acessar detalhes do filme para editar uma avaliação feita anteriormente
        Given que estou logado e avaliei previamente um filme
        When acessar meu perfil
        And selecionar uma avaliação feita anteriormente
        And editar avaliação
        Then a avaliação antiga será atualizada

    @ignore @login
    Scenario: Não deve ser possível duplicar uma avaliação
        Given que estou logado e avaliei previamente um filme
        When acessar meu perfil
        And selecionar uma avaliação feita anteriormente
        And e inserir novas informaçoes
        Then a avaliação antiga será atualizada
        And não será possível criar nova avaliação
    
   @ignore @usuarioQualquer
    Scenario: Não deve ser possível consultar avaliação do usuário sem estar logado
        Given sou um usuário qualquer
        Then não tenho acesso à tela de perfil
        And não será possível consultar minha lista de avaliações
    
    @ignore
    Scenario: Deve exibir lista vazia se o usuário não realizou avaliaçoes
        Given que estou logado
        And não relizei avaliações previamente
        When acessar meu perfil
        Then visualizo a lista de avaliações em branco