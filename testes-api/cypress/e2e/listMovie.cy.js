describe('Testes de listagem de filmes - Api', function () {
    before(function () {
        cy.newUser();
    });

    it('Deve ser possível um usuário logado fazer uma consulta de filmes', function () {
        cy.request({
            method: 'GET',
            url: 'movies',
        }).then(function (response) {
            var listaDeFilmes = response.body.length
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('Array');
            expect(response.body).to.have.length(listaDeFilmes)
        });
    })

    it('Deve ser possível um usuário não logado fazer a consulta de filmes', function () {
        cy.request({
            method: 'GET',
            url: 'movies',
        }).then(function (response) {
            var listaDeFilmes = response.body.length
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('Array');
            expect(response.body).to.have.length(listaDeFilmes)
        });
    });

    it('Deve ser possível verificar todas as informações de um filme contido na lista', function () {
        cy.request({
            method: 'GET',
            url: 'movies',
        }).then(function (response) {
            expect(response.status).to.equal(200);
            expect(response.body[0]).to.have.property('id')
            expect(response.body[0]).to.have.property('title')
            expect(response.body[0]).to.have.property('genre')
            expect(response.body[0]).to.have.property('description')
            expect(response.body[0]).to.have.property('totalRating')
            expect(response.body[0]).to.have.property('releaseYear')
        });
    });
}); 