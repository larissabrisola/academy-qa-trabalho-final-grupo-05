Feature: Pesquisa de filme
    Como uma pessoa qualquer acessando o sistema
    Desejo poder pesquisar entre os filmes cadastrados
    Para ser mais eficiente em minha busca pelo catálogo de filmes

    # @usuarioQualquer
    Scenario: Deve ser possível encontrar um filme por meio do seu título sem estar logado
        Given que estou na tela de filmes
        When informar o nome de um filme na barra de pesquisa
        And concluir operação
        Then será possível visualizar o filme pesquisado

    Scenario: Deve ser possível encontrar um filme por meio do seu título estando logado
        Given que estou logado e na tela de filmes
        When informar o nome de um filme na barra de pesquisa
        And concluir operação
        Then será possível visualizar o filme pesquisado
    
    Scenario: Não deve ser possível encontrar um filme deletado
        Given que estou logado e na tela de filmes
        When informar o nome de um filme que foi deletado
        And concluir operação
        Then não será possível visualizar o filme na lista
    
    Scenario: Deve ser possível encontrar um filme inserindo seu título parcialmente
        Given que estou logado e na tela de filmes
        When informar parcialmente o nome de um filme
        And concluir operação
        Then será possível visualizar lista de filmes que contem o que foi pesquisado
    
    Scenario: Não deve ser possível buscar filme inserindo multiplos parâmetros
        Given que estou logado e na tela de filmes
        When informar o nome e o ano de lançamento do filme
        And concluir operação
        Then não será possível visualizar o filme na lista
    
    Scenario: Não deve ser possível buscar filme pela ID
        Given que estou logado e na tela de filmes
        When informar o id de um filme no campo de pesquisa
        And concluir operação
        Then não será possível visualizar o filme na lista