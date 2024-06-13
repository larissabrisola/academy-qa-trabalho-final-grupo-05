Feature: Listagem de filmes

    Background: usuário está na tela inicial 
        Given usuário está na tela inicial 

    # Scenario: Deve ser possivel visualizar duas categorias de filmes: em destaque e mais bem avaliados
    #     When existir filmes cadastrados 
    #     Then deve ser possivel visualizar duas categorias de filmes
    Scenario: Deve ser possivel visualizar titulo, descrição, capa e nota dos filmes
        When existir filmes cadastrados 
        Then deve ser possivel visualizar as informações dos filmes 
    # Scenario: Deve ser possivel navegar entre os filmes em destaque
    #     When existir filmes cadastrados 
    # Scenario: Deve ser possivel navegar entre os filmes mais bem avaliados
    #     When existir filmes cadastrados 
    # Scenario: Deve ser possivel consultar mais detalhes do filme ao seleciona-lo
    #     When existir filmes cadastrados 
    # Scenario: Deve ser exibido um aviso quando não existir filmes cadastrados
    #     When não existir filmes cadastrados 
    #     Then um aviso será exibido
    # Scenario: Não deve ser possivel avançar ao chegar no fim da lista de filmes em destaque
    #     When existir filmes cadastrados 
    # Scenario: Não deve ser possivel voltar ao chegar ao inicio da lista de filmes em destaque
    #     When existir filmes cadastrados 
    # Scenario: Não deve ser possivel avançar ao chegar no fim da lista de filmes mais bem avaliados
    #     When existir filmes cadastrados 
    # Scenario: Não deve ser possivel voltar ao chegar ao inicio da lista de filmes mais bem avaliados
    #     When existir filmes cadastrados 
    # Scenario: Deve ser possivel visualizar a lista de filmes estando autenticado
    #     When está autenticado 
    #     Then deve ser possivel visualizar a lista de filmes 
    # Scenario: Deve ser possivel visualizar a lista de filmes sem estar autenticado
    #     When não está autenticado
    #     Then deve ser possivel visualizar a lista de filmes 
