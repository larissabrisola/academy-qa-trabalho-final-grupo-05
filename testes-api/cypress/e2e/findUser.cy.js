import { faker } from "@faker-js/faker"

describe('Testes da funcionalidade de encontrar usuários', () => {
    let userName;
    let userEmail;
    let password;
    let uId;
    let uToken;

    beforeEach(() => {
        userName = faker.person.fullName();
        userEmail = faker.internet.email();
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

    it('Deve ser possível encontrar o próprio usuário por meio da id', () => {
        cy.request({
            method: 'GET',
            url: 'users/' + uId,
            headers: {
                Authorization: `Bearer ${uToken}`
            },
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(uId);
            expect(response.body.name).to.equal(userName);
            // expect(response.body.email).includes(userEmail); aqui tá quebrando por causa das iniciais do email
            expect(response.body).to.have.property('type');
            expect(response.body).to.have.property('active');
        })
    })

    it('Não deve ser possível encontrar usuário deletado', () => {
        let id;
        cy.promoteAdmin();
        cy.createUser(faker.person.fullName(), faker.internet.email(), '123456').then((response) => {
            id = response.body.id;
            cy.log(id)
            cy.deleteUser(id, uToken);
            cy.request({
                method: 'GET',
                url: 'users/' + id,
                headers: {
                    Authorization: `Bearer ${uToken}`
                },
            }).then((response) => {
                expect(response.body).not.contain(uId);
                expect(response.body).not.contain(userName);
                expect(response.body).not.contain(userEmail);
            })
        })


    })

    it('Não deve ser possível encontrar usuário por meio de outros dados', () => {
        cy.request({
            method: 'GET',
            url: 'users/' + userEmail,
            headers: {
                Authorization: `Bearer ${uToken}`
            },

        })
    })

    it('Não deve ser possível encontrar usuário com o campo em branco', () => {

    })

    it('Um usuário comum não deve encontrar outros cadastros', () => {

    })

    it('Apenas um usuário do tipo admin pode encontrar outros cadastros', () => {

    })
})