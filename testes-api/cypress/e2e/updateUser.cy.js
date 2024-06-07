import { faker } from "@faker-js/faker"

describe('Testes da funcionalidade de atualizar usuários', () => {
    let userName;
    let userEmail;
    let password;
    let uId;
    let uToken;

    beforeEach(() => {
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

    afterEach(() => {
        cy.promoteAdmin();
        cy.deleteUser(uId, uToken);
    })

    it('Deve ser possível atualizar o próprio nome e senha com sucesso', () => {
        cy.request({
            method: 'PUT',
            url: 'users/' + uId,
            body: {
                name: 'Zelda',
                password: '252525'
            },
            headers: {
                Authorization: `Bearer ${uToken}`
            },
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.name).to.equal('Zelda')
            expect(response.body.email).to.equal(userEmail)
        })
    })

    it('Deve ser possível atualizar outras contas como um usuário admin', () => {
        let name = faker.person.firstName();
        let email = faker.internet.email().toLowerCase();

        cy.promoteAdmin();
        cy.createUser(name, email, '1234567').then((response) => {
            cy.wrap(response.body).as('body')
        });
        cy.get('@body').then((body) => {
            cy.request({
                method: 'PUT',
                url: 'users/' + body.id,
                body: {
                    name: 'Zelda',
                    password: '252525'
                },
                headers: {
                    Authorization: `Bearer ${uToken}`
                },
            }).then((response) => {
                expect(response.body.name).to.equal('Zelda');
                expect(response.body.email).to.equal(email);
                expect(response.body.id).to.equal(body.id);
                expect(response.body).to.have.property('type');
                expect(response.body).to.have.property('active');
            })
        })
    })

    it('Não deve ser possível atualizar outra contas como um usuário comum', () => {
        let name = faker.person.firstName();
        let email = faker.internet.email().toLowerCase();

        cy.createUser(name, email, '1234567').then((response) => {
            cy.wrap(response.body).as('body')
        });
        cy.get('@body').then((body) => {
            cy.request({
                method: 'PUT',
                url: 'users/' + body.id,
                body: {
                    name: 'Zelda',
                    password: '252525'
                },
                headers: {
                    Authorization: `Bearer ${uToken}`
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(403);
                expect(response.body.message).to.equal("Forbidden");
            })
        })
    })


    it('Não deve ser possível atualizar outras contas como um usuário critico', () => {
        let name = faker.person.firstName();
        let email = faker.internet.email().toLowerCase();
        
        cy.promoteCritic();
        cy.createUser(name, email, '1234567').then((response) => {
            cy.wrap(response.body).as('body')
        });
        cy.get('@body').then((body) => {
            cy.request({
                method: 'PUT',
                url: 'users/' + body.id,
                body: {
                    name: 'Zelda',
                    password: '252525'
                },
                headers: {
                    Authorization: `Bearer ${uToken}`
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(403);
                expect(response.body.message).to.equal("Forbidden");
            })
        })

    })

    it('Não deve ser possível deixar campos sem informação', () => {

    })
    it('O novo nome precisa estar entre 1 e 100 caracteres', () => {

    })
    it('A nova senha precisa estar entre 6 a 12 caracteres', () => {

    })
})
