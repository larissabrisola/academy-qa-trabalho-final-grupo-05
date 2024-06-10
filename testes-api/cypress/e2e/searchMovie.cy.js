import { faker } from "@faker-js/faker"

describe('Buscar filme com o usuário logado e autenticado no sistema', () => {
    let uId;
    let uToken;
    let filme;

    before(() => {
        const user = createUserForMovies();
        cy.createUser(user.name, user.email, user.password).then((response) => {
            uId = response.body.id;
        })
        cy.login(user.email, user.password).then((response) => {
            uToken = response.body.accessToken
            cy.promoteAdmin(uToken);
        })
        cy.createMovie().then((response) => {
            cy.wrap(response).as('data')
        });
        cy.get('@data').then((data) => {
            filme = data;
        })
    })

    after(() => {
        cy.deleteUser(uId, uToken);
    })

    it('Deve ser possível encontrar um filme por meio de seu título estando logado no sistema', () => {
        cy.request({
            method: 'GET',
            url: 'movies/search?title=' + filme.title,
            headers: {
                Authorization: `Bearer ${uToken}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body[0]).to.include(filme)
        })
    })

    it('Deve ser possível encontrar um filme por meio de seu título sem estar logado no sistema', () => {
        cy.request({
            method: 'GET',
            url: 'movies/search?title=' + filme.title,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body[0]).to.include(filme)
        })
    })

    it('Não deve ser possível encontrar um filme deletado', () => {
        cy.deleteMovie(filme.id, uToken)
        cy.request({
            method: 'GET',
            url: 'movies/search?title=' + filme.title,
            headers: {
                Authorization: `Bearer ${uToken}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).be.empty;
        })
    })

    it('Deve ser possível encontrar um filme inserindo dados parciais', () => {
        const parcialTitle = filme.title.slice(0, 3)
        cy.request({
            method: 'GET',
            url: 'movies/search?title=' + parcialTitle
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                cy.log(response.body)

                const movies = response.body;
                const containsFilme = movies.some(movie => movie.title.includes(parcialTitle))
                expect(containsFilme).to.be.true
        })
    })

    it('Não deve ser possível buscar filme inserindo multiplos parâmetros', () => {
        cy.request({
            method: 'GET',
            url: 'movies/search?title=' + filme.title + ' de ' + filme.releaseYear
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).be.empty;
        })
    })

    it('Não deve ser possível buscar filme pela ID', () => {
        cy.request({
            method: 'GET',
            url: 'movies/search?title=' + filme.id
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).be.empty;
        })
    })
})

function createUserForMovies() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password({ length: 10 }),
    };
};
