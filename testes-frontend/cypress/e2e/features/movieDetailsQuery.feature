Feature: Consulta de detalhes de filmes
    Como uma pessoa qualquer acessando o sistema
    Desejo poder consultar mais detalhes de um filme
    Para poder visualizar todas as informações registradas para aquele filme
    
    # @ignore
    Scenario: Deve ser possível visualizar todas as informações de um filme com um usuário do tipo comum
        Given que estou logado e na tela de filmes
        When selecionar um filme
        Then tenho acesso à todas aos detalhes do filme selecionado

    # @ignore
    Scenario: Deve ser possível visualizar todas as informações de um filme sem estar logado
        Given que estou na tela de filmes
        When selecionar um filme
        Then tenho acesso à todas aos detalhes do filme selecionado
    
    # @ignore
    Scenario: Deve ser possível acessar a opção para avaliar filme
        Given que estou logado e na tela de filmes
        When selecionar um filme
        Then consigo criar uma avaliação
    
    # @ignore
    Scenario: Deve ser possível visualizar informações de uma avaliação
        Given que estou logado e na tela de filmes
        When selecionar um filme
        And adicionar uma avaliação
        Then consigo visualizar todos os detalhes de uma avaliação
