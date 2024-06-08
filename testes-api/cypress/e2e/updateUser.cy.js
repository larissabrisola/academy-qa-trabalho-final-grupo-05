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

    it('Não deve ser possível deixar campo nome sem informação (sem o mínimo valor de caracteres)', () => {
        cy.request({
            method: 'PUT',
            url: 'users/' + uId,
            body: {
                name: '',
                password: '252525'
            },
            headers: {
                Authorization: `Bearer ${uToken}`
            }, failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.statusCode).to.equal(400)
            expect(response.body.error).to.equal("Bad Request")
            expect(response.body.message[0]).to.equal('name must be longer than or equal to 1 characters')
        })
    })

    it('Não deve ser possível deixar campo senha sem informação (sem o mínimo valor de caracteres)', () => {
        cy.request({
            method: 'PUT',
            url: 'users/' + uId,
            body: {
                name: 'Zelda',
                password: ''
            },
            headers: {
                Authorization: `Bearer ${uToken}`
            }, failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.statusCode).to.equal(400)
            expect(response.body.error).to.equal("Bad Request")
            expect(response.body.message[0]).to.equal('password must be longer than or equal to 6 characters')
        })
    })


    it('O novo nome precisa ter no máximo 100 caracteres', () => {
        cy.request({
            method: 'PUT',
            url: 'users/' + uId,
            body: {
                name: 'a'.repeat(101),
                password: '252525'
            },
            headers: {
                Authorization: `Bearer ${uToken}`
            }, failOnStatusCode: false
        }).then((response) => {
            expect(response.body.statusCode).to.equal(400)
            expect(response.body.error).to.equal("Bad Request")
            expect(response.body.message[0]).to.equal('name must be shorter than or equal to 100 characters')
        })
    })

    it('A nova senha precisa ter no máximo 12 caracteres', () => {
        cy.request({
            method: 'PUT',
            url: 'users/' + uId,
            body: {
                name: 'Zelda',
                password: '252525'.repeat(13)
            },
            headers: {
                Authorization: `Bearer ${uToken}`
            }, failOnStatusCode: false
        }).then((response) => {
            expect(response.body.statusCode).to.equal(400)
            expect(response.body.error).to.equal("Bad Request")
            expect(response.body.message[0]).to.equal('password must be shorter than or equal to 12 characters')
        })
    })
})
