Feature: Consulta de detalhes de filmes
    Como uma pessoa qualquer acessando o sistema
    Desejo poder consultar mais detalhes de um filme
    Para poder visualizar todas as informações registradas para aquele filme
    
    Scenario: Deve ser possível visualizar todas as informações estando logado
        Given que estou logado e na tela de filmes
        When selecionar um filme
        Then tenho acesso à todas aos detalhes do filme selecionado

    Scenario: Deve ser possível visualizar todas as informações de um filme sem estar logado
        Given que estou na tela de filmes
        When selecionar um filme
        Then tenho acesso à todas aos detalhes do filme selecionado
    
    Scenario: Deve ser possível visualizar a média das avaliações da audiência
        Given que estou na tela de filmes
        When selecionar um filme
        Then consigo visualizar a média das avaliações da audiência

    Scenario: Deve ser possível visualizar a média das avaliações da crítica
        Given que estou na tela de filmes
        When selecionar um filme
        Then consigo visualizar a média das avaliações da crítica

    Scenario: Deve ser possível acessar a opção para avaliar filme
        Given que estou logado e na tela de filmes
        When selecionar um filme
        Then consigo criar uma avaliação
    
    Scenario: Deve ser possível visualizar informações de uma avaliação
        Given que estou logado e na tela de filmes
        When selecionar um filme
        And adicionar uma avaliação
        Then consigo visualizar todos os detalhes de uma avaliação
