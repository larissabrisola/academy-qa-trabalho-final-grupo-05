import { faker } from "@faker-js/faker"
const jwt = require('jsonwebtoken');

describe('Login', function () {
     
    let userValid = {
        name: "odeiotedmosby", 
        email: "dois" + faker.internet.exampleEmail(), 
        password: "tedmosbylixo"
    }

    before(()=>{
        cy.createUser(userValid.name, userValid.email, userValid.password)
    })

    it('Deve ser possivel realizar login', ()=>{
        cy.login(userValid.email, userValid.password).then((response)=>{
            expect(response.status).to.equal(200);
            expect(response.body).to.have.own.property('accessToken')
        })
    })

    it('Não deve ser possivel realizar login informando senha incorreta', ()=>{
        cy.login(userValid.email, "password", false).then((response)=>{
            expect(response.body).to.deep.equal( {
                "message": "Invalid username or password.",
                "error": "Unauthorized",
                "statusCode": 401
                })
        })
    })

    it('Não deve ser possivel realizar login informando email não cadastrado', ()=>{
        cy.login("ju" + faker.internet.exampleEmail(), userValid.password, false).then((response)=>{
            expect(response.body).to.deep.equal({
                "message": "Invalid username or password.",
                "error": "Unauthorized",
                "statusCode": 401
                })
        })

    })

    it('Não deve ser possivel realizar login sem informar a senha', ()=>{
        cy.login(userValid.email, "",  false).then((response)=>{
            expect(response.body).to.deep.equal( {
                "message": [
                "password should not be empty"
                ],
                "error": "Bad Request",
                "statusCode": 400
                }
                )
        })
    })

    it('Não deve ser possivel realizar login sem informar o email', ()=>{
        cy.login("", userValid.password, false).then((response)=>{
            expect(response.body).to.deep.equal({
                "message": [
                "email should not be empty",
                "email must be an email"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        })
    })

    it('Não deve ser possivel realizar login com todos campos vazios', ()=>{
        cy.login("", "", false).then((response)=>{
            expect(response.body).to.deep.equal( {
                "message": [
                "email should not be empty",
                "email must be an email",
                "password should not be empty"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        })
    })

    it('O login deve expirar em 60 minutos', ()=>{
        cy.login(userValid.email, userValid.password).then((response)=>{
            let token = response.body.accessToken;

            let decodedToken = jwt.decode(token); 

            let iat = decodedToken.iat 
            let exp = decodedToken.exp
            
            let duration = 3600

            let result = exp - iat 

            expect(result).to.deep.equal(duration)

        })
    })
})