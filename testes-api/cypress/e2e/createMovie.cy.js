import { faker } from "@faker-js/faker";

describe("Cadastro de filme", () => {

    let titleMovie = faker.music.songName()
    let genreMovie = faker.music.songName()
    let descriptionMovie = faker.lorem.sentences()
    let durationInMinutes = 100
    let releaseYear = 2020

  it("Cadastrar filme com sucesso", () => {
    cy.createAndLogAdmin(faker.animal.cow(), faker.internet.exampleEmail(),"linuxtiops").then((response) => {
      let token = response.token;
      cy.request({
        method: "POST",
        url: "movies",
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
        body: {
          title: titleMovie,
          genre: genreMovie,
          description: descriptionMovie,
          durationInMinutes: durationInMinutes,
          releaseYear: releaseYear,
        },
      }).then((response) => {
        let movieId = response.body.id
        expect(response.status).to.equal(201)
        expect(response.body).to.deep.equal({
            "id": movieId,
            "title": titleMovie,
            "genre": genreMovie,
            "description": descriptionMovie,
            "durationInMinutes": durationInMinutes,
            "releaseYear": releaseYear,
      })
      });
    });
  });

  it('Deve ser possivel cadastrar filme com titulo contendo 100 caracteres', ()=>{
    let bigTitle = faker.string.alpha(100)

    cy.adminCreatesAMovie(bigTitle, genreMovie, descriptionMovie, durationInMinutes, releaseYear).then((response)=>{
        let movieId = response.body.id
        expect(response.status).to.equal(201)

        expect(response.body).to.deep.equal({
            "id": movieId,
            "title": bigTitle,
            "genre": genreMovie,
            "description": descriptionMovie,
            "durationInMinutes": durationInMinutes,
            "releaseYear": releaseYear,
      })
    })
  })

  it('Deve ser possivel cadastrar filme com gênero contendo 100 caracteres', ()=>{
    let bigGenre = faker.string.alpha(100)

    cy.adminCreatesAMovie(titleMovie, bigGenre, descriptionMovie, durationInMinutes, releaseYear).then((response)=>{
        let movieId = response.body.id
        expect(response.status).to.equal(201)

        expect(response.body).to.deep.equal({
            "id": movieId,
            "title": titleMovie,
            "genre": bigGenre,
            "description": descriptionMovie,
            "durationInMinutes": durationInMinutes,
            "releaseYear": releaseYear,
      })
    })
  })

  it('Deve ser possivel cadastrar filme com descrição contendo 500 caracteres', ()=>{
    let bigDescription = faker.string.alpha(500)

    cy.adminCreatesAMovie(titleMovie, genreMovie, bigDescription, durationInMinutes, releaseYear).then((response)=>{
        let movieId = response.body.id
        expect(response.status).to.equal(201)

        expect(response.body).to.deep.equal({
            "id": movieId,
            "title": titleMovie,
            "genre": genreMovie,
            "description": bigDescription,
            "durationInMinutes": durationInMinutes,
            "releaseYear": releaseYear,
      })
    })
  })

  it('Deve ser possivel cadastrar filme com ano de lançamento igual 1895', ()=>{

    let releaseYearFirstMovie = 1895

    cy.adminCreatesAMovie(titleMovie, genreMovie, descriptionMovie, durationInMinutes, releaseYearFirstMovie).then((response)=>{
        let movieId = response.body.id
        expect(response.status).to.equal(201)

        expect(response.body).to.deep.equal({
            "id": movieId,
            "title": titleMovie,
            "genre": genreMovie,
            "description": descriptionMovie,
            "durationInMinutes": durationInMinutes,
            "releaseYear": releaseYearFirstMovie,
      })
    })
  })

  it('Deve ser possivel cadastrar filme com duração de 1 minuto', ()=>{
    let duration = 1

    cy.adminCreatesAMovie(titleMovie, genreMovie, descriptionMovie, duration, releaseYear).then((response)=>{
        let movieId = response.body.id
        expect(response.status).to.equal(201)

        expect(response.body).to.deep.equal({
            "id": movieId,
            "title": titleMovie,
            "genre": genreMovie,
            "description": descriptionMovie,
            "durationInMinutes": duration,
            "releaseYear": releaseYear,
      })
    })
  })

  it('Deve ser possivel cadastrar filme com duração de 720 horas (43200 minutos)', ()=>{
    let longDuration = 43200

    cy.adminCreatesAMovie(titleMovie, genreMovie, descriptionMovie, longDuration, releaseYear).then((response)=>{
        let movieId = response.body.id
        expect(response.status).to.equal(201)

        expect(response.body).to.deep.equal({
            "id": movieId,
            "title": titleMovie,
            "genre": genreMovie,
            "description": descriptionMovie,
            "durationInMinutes": longDuration,
            "releaseYear": releaseYear,
      })
    })
    
  })

  it('Não deve ser possivel cadastrar filme com duração acima de 720 horas', ()=>{
    let expDuration = 43201

    cy.adminCreatesAMovie(titleMovie, genreMovie, descriptionMovie, expDuration, releaseYear, false).then((response)=>{
        expect(response.status).to.equal(400)

        expect(response.body).to.deep.equal( {
            "message": [
            "durationInMinutes must not be greater than 43200"
            ],
            "error": "Bad Request",
            "statusCode": 400
            })
    })
  })

  it('Não deve ser possivel cadastrar filme com duração abaixo de 1 minuto', ()=>{
    let duration = 0

    cy.adminCreatesAMovie(titleMovie, genreMovie, descriptionMovie, duration, releaseYear, false).then((response)=>{
        expect(response.status).to.equal(400)

        expect(response.body).to.deep.equal( {
            "message": [
            "durationInMinutes must not be less than 1"
            ],
            "error": "Bad Request",
            "statusCode": 400
            })
    })
})
  it('Não deve ser possivel cadastrar filme com titulo contendo 101 ou mais caracteres', ()=>{
    let expTitle = faker.string.alpha(101)

    cy.adminCreatesAMovie(expTitle, genreMovie, descriptionMovie, durationInMinutes, releaseYear, false).then((response)=>{
        expect(response.status).to.equal(400)

        expect(response.body).to.deep.equal( {
            "message": [
            "title must be shorter than or equal to 100 characters"
            ],
            "error": "Bad Request",
            "statusCode": 400
            })
    })
  })

  it('Não deve ser possivel cadastrar filme com gênero contendo 101 ou mais caracteres', ()=>{
    let expGenre = faker.string.alpha(101)

    cy.adminCreatesAMovie(titleMovie, expGenre, descriptionMovie, durationInMinutes, releaseYear, false).then((response)=>{
        expect(response.status).to.equal(400)

        expect(response.body).to.deep.equal( {
            "message": [
            "genre must be shorter than or equal to 100 characters"
            ],
            "error": "Bad Request",
            "statusCode": 400
            })
    })
  })

  it('Não deve ser possivel cadastrar filme com descrição contendo 501 ou mais caracteres', ()=>{
    let expDescrip = faker.string.alpha(501)

    cy.adminCreatesAMovie(titleMovie, genreMovie, expDescrip, durationInMinutes, releaseYear, false).then((response)=>{
        expect(response.status).to.equal(400)

        expect(response.body).to.deep.equal( {
            "message": [
            "description must be shorter than or equal to 500 characters"
            ],
            "error": "Bad Request",
            "statusCode": 400
            })
    })
  })

  it('Não deve ser possivel cadastrar filme com ano de lançamento inferior a 1895', ()=>{
    let invalidYear = 1894

    cy.adminCreatesAMovie(titleMovie, genreMovie, descriptionMovie, durationInMinutes, invalidYear, false).then((response)=>{
        expect(response.status).to.equal(400)

        expect(response.body).to.deep.equal( {
            "message": [
            "releaseYear must not be less than 1895"
            ],
            "error": "Bad Request",
            "statusCode": 400
            })
    })
  })

  it('Não deve ser possivel cadastrar filme com ano de lançamento acima do ano atual', ()=>{
    let invalidYear = 2025

    cy.adminCreatesAMovie(titleMovie, genreMovie, descriptionMovie, durationInMinutes, invalidYear, false).then((response)=>{
        expect(response.status).to.equal(400)

        expect(response.body).to.deep.equal({
            "message": [
            "releaseYear must not be greater than 2024"
            ],
            "error": "Bad Request",
            "statusCode": 400
            })
    })
  })


  it('Não deve ser possivel cadastrar um filme como usuário comum', ()=>{
    cy.createAndLoginUser('joca', faker.internet.exampleEmail(), 'passarin').then((response)=>{
        let token = response.token

        cy.request({
            method: "POST",
            url: "movies",
            headers: {
              Authorization: `${token}`,
            },
            body: {
              title: "Jolene",
              genre: "Terror",
              description: "dont take my man",
              durationInMinutes: 20,
              releaseYear: 2000,
            }, failOnStatusCode: false
          }).then((response)=>{
            expect(response.body).to.deep.equal( {
                "message": "Access denied.",
                "error": "Unauthorized",
                "statusCode": 401
                })
          })
    })
    

  })

  it('Não deve ser possivel cadastrar um filme como usuário critico', ()=>{
    cy.createAndLoginCritic('LadyGaga', faker.internet.exampleEmail(), 'passarin').then((response)=>{
        let token = response.token

        cy.request({
            method: "POST",
            url: "movies",
            headers: {
              Authorization: `${token}`,
            },
            body: {
              title: "Lunch",
              genre: "Terror",
              description: "I could eat that",
              durationInMinutes: 20,
              releaseYear: 2000,
            }, failOnStatusCode: false
          }).then((response)=>{
            expect(response.body).to.deep.equal( {
                "message": "Access denied.",
                "error": "Unauthorized",
                "statusCode": 401
                })
          })
    })
  })

  it('Não deve ser possivel cadastrar um filme sem descrição', ()=>{
    cy.createAndLogAdmin(faker.animal.cow(), faker.internet.exampleEmail(),"linuxtiops").then((response) => {
        let token = response.token;
        cy.request({
          method: "POST",
          url: "movies",
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            title: titleMovie,
            genre: genreMovie,
            durationInMinutes: durationInMinutes,
            releaseYear: releaseYear,
          }, failOnStatusCode: false
        }).then((response) => {
            expect(response.body).to.deep.equal({
                "message": [
                "description must be longer than or equal to 1 characters",
                "description must be a string",
                "description should not be empty"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        
        });
      });
  })

  it('Não deve ser possivel cadastrar um filme sem gênero', ()=>{
    cy.createAndLogAdmin(faker.animal.cow(), faker.internet.exampleEmail(),"linuxtiops").then((response) => {
        let token = response.token;
        cy.request({
          method: "POST",
          url: "movies",
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            title: titleMovie,
            description: descriptionMovie,
            durationInMinutes: durationInMinutes,
            releaseYear: releaseYear,
          }, failOnStatusCode: false
        }).then((response) => {
          expect(response.body).to.deep.equal({
            "message": [
            "genre must be longer than or equal to 1 characters",
            "genre must be a string",
            "genre should not be empty"
            ],
            "error": "Bad Request",
            "statusCode": 400
            })
        });
      });
  })

  it('Não deve ser possivel cadastrar um filme sem titulo', ()=>{
    cy.createAndLogAdmin(faker.animal.cow(), faker.internet.exampleEmail(),"linuxtiops").then((response) => {
        let token = response.token;
        cy.request({
          method: "POST",
          url: "movies",
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            genre: genreMovie,
            description: descriptionMovie,
            durationInMinutes: durationInMinutes,
            releaseYear: releaseYear,
          }, failOnStatusCode: false
        }).then((response) => {
            expect(response.body).to.deep.equal({
                "message": [
                "title must be longer than or equal to 1 characters",
                "title must be a string",
                "title should not be empty"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
        });
      });
  })

  it('Não deve ser possivel cadastrar um filme sem tempo de duração', ()=>{
    cy.createAndLogAdmin(faker.animal.cow(), faker.internet.exampleEmail(),"linuxtiops").then((response) => {
        let token = response.token;
        cy.request({
          method: "POST",
          url: "movies",
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            title: titleMovie,
            genre: genreMovie,
            description: descriptionMovie,
            releaseYear: releaseYear,
          }, failOnStatusCode: false
        }).then((response) => {
          expect(response.body).to.deep.equal( {
            "message": [
            "durationInMinutes must not be greater than 43200",
            "durationInMinutes must not be less than 1",
            "durationInMinutes must be an integer number",
            "durationInMinutes must be a number conforming to the specified constraints",
            "durationInMinutes should not be empty"
            ],
            "error": "Bad Request",
            "statusCode": 400
            })
        });
      });
  })
  it('Não deve ser possivel cadastrar um filme sem ano de lançamento', ()=>{
    cy.createAndLogAdmin(faker.animal.cow(), faker.internet.exampleEmail(),"linuxtiops").then((response) => {
        let token = response.token;
        cy.request({
          method: "POST",
          url: "movies",
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
          body: {
            title: titleMovie,
            genre: genreMovie,
            description: descriptionMovie,
            durationInMinutes: durationInMinutes
          }, failOnStatusCode: false
        }).then((response) => {
          expect(response.body).to.deep.equal( {
            "message": [
            "releaseYear must not be greater than 2024",
            "releaseYear must not be less than 1895",
            "releaseYear must be an integer number",
            "releaseYear must be a number conforming to the specified constraints",
            "releaseYear should not be empty"
            ],
            "error": "Bad Request",
            "statusCode": 400
            })
        });
      });
  })
  it('Não deve ser possivel cadastrar um filme com valor inválido em tempo de duração', ()=>{
    let invalidDuration = [ "dois mil", "#@!", "😁", "    ", "ç[e"]

    invalidDuration.forEach(invalidDuration =>{
      cy.adminCreatesAMovie(titleMovie, genreMovie, descriptionMovie, invalidDuration, releaseYear, false).then((response)=>{
        expect(response.body).to.deep.equal({
                  "message": [
                  "durationInMinutes must not be greater than 43200",
                  "durationInMinutes must not be less than 1",
                  "durationInMinutes must be an integer number",
                  "durationInMinutes must be a number conforming to the specified constraints"
                  ],
                  "error": "Bad Request",
                  "statusCode": 400
                  })
      })
    })
  })

  it('Não deve ser possivel cadastrar um filme com valor inválido em ano de lançamento', ()=>{

    let notAReleaseYear = [ "dois mil", "#@!", "😁", "    ", "ç[e"]

    notAReleaseYear.forEach(notYear =>{

      cy.adminCreatesAMovie(titleMovie, genreMovie, descriptionMovie, durationInMinutes, notYear, false).then((response)=>{
        expect(response.body).to.deep.equal( {
                "message": [
                "releaseYear must not be greater than 2024",
                "releaseYear must not be less than 1895",
                "releaseYear must be an integer number",
                "releaseYear must be a number conforming to the specified constraints"
                ],
                "error": "Bad Request",
                "statusCode": 400
                })
      })

    })

  })

});
