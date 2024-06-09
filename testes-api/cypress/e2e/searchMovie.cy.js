import { faker } from "@faker-js/faker"

describe('Testes da funcionalidade de buscar filme', () => {
    let uId;
    let uToken;

    before(() => {
        const user = createUserForMovies();
        cy.createUser(user.name, user.email, user.password).then((response) => {
            uId = response.body.id;
        })
        cy.login(user.email, user.password).then((response) => {
            uToken = response.body.accessToken;
        })
        cy.promoteAdmin();
        cy.createMovie().then((response) => {
            cy.wrap(response).as('data')
        });
    })

    after(() => {
        cy.deleteUser(uId, uToken);
    })

    it('Deve ser possível encontrar um filme por meio de seu título sem estar logado no sistema', () => {
        cy.get('@data').then((data) => {
            cy.request({
                method: 'GET',
                url: 'movies/search?title=' + data.title,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0]).to.include(data)
            })
        })
    })

    it('Deve ser possível encontrar um filme por meio de seu título estando logado no sistema', () => {
        cy.get('@data').then((data) => {
            cy.request({
                method: 'GET',
                url: 'movies/search?title=' + data.title,
                headers: {
                    Authorization: `Bearer ${uToken}`
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0]).to.include(data)
            })
        })
    })

    it.only('Não deve ser possível encontrar um filme deletado', () => {
        cy.get('@data').then((data) => {
            cy.deleteMovie(data.id, uToken)
            cy.request({
                method: 'GET',
                url: 'movies/search?title=' + data.title,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).be.empty;
            })
        })
    })

    it('Não deve ser possível encontrar um filme inserindo outros dados', () => {

    })
})

// cy.createMovie().then((response) => {
//     cy.wrap(response).as('data')
// });



//})



function createUserForMovies() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password({ length: 10 }),
    };
};