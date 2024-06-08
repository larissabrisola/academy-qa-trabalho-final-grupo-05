import { faker } from "@faker-js/faker"

describe('Testes de listagem de filmes', function () {
    let userName;
    let userEmail;
    let password;
    let uId;
    let uToken;

    before(() => {
        userName = faker.person.fullName();
        userEmail = faker.internet.email().toLowerCase();;
        password = faker.internet.password({ length: 10 });

        cy.createUser(userName, userEmail, password).then((response) => {
            uId = response.body.id;
        })
        cy.login(userEmail, password).then((response) => {
            uToken = response.body.accessToken;
        })
    })
    after(() => {
        cy.promoteAdmin();
        cy.deleteUser(uId, uToken);
    })

    it('Deve ser possível um usuário logado fazer uma consulta de filmes', function () {
        cy.request({
            method: 'GET',
            url: 'movies',
            auth: {
                bearer: uToken,
            },
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
        let tamanhoLista
        let title = faker.person.firstName() + 'ão' + ' O filme'
        let genre = faker.person.firstName() + ' Ação'
        let description = faker.lorem.words({ min: 8, max: 10 })

        cy.adminCreatesAMovie(title, genre, description, 180, 2024, 'true')
        cy.request({
            method: 'GET',
            url: 'movies',
        }).then(function (response) {
            tamanhoLista = response.body.length - 1
            expect(response.status).to.equal(200);
            expect(response.body[tamanhoLista].title).to.equal(title)
            expect(response.body[tamanhoLista].genre).to.equal(genre)
            expect(response.body[tamanhoLista].description).to.equal(description)
            expect(response.body[tamanhoLista].totalRating).to.equal(null)
            expect(response.body[tamanhoLista].durationInMinutes).to.equal(180)
            expect(response.body[tamanhoLista].releaseYear).to.equal(2024)
        });
    });
});




