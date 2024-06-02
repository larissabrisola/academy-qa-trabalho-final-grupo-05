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
    
})
  it('Não deve ser possivel cadastrar filme com titulo contendo 101 ou mais caracteres', ()=>{

  })

  it('Não deve ser possivel cadastrar filme com gênero contendo 101 ou mais caracteres', ()=>{

  })

  it('Não deve ser possivel cadastrar filme com descrição contendo 501 ou mais caracteres', ()=>{

  })

  it('Não deve ser possivel cadastrar filme com ano de lançamento inferior a 1895', ()=>{

  })

  it('Não deve ser possivel cadastrar filme com ano de lançamento acima do ano atual', ()=>{

  })


  it('Não deve ser possivel cadastrar um filme como usuário comum', ()=>{

  })

  it('Não deve ser possivel cadastrar um filme como usuário critico', ()=>{

  })

  it('Não deve ser possivel cadastrar um filme sem descrição', ()=>{
    //   "description must be longer than or equal to 1 characters",
    //"description should not be empty"
  })

  it('Não deve ser possivel cadastrar um filme sem gênero', ()=>{

  })

  it('Não deve ser possivel cadastrar um filme sem titulo', ()=>{

  })

  it('Não deve ser possivel cadastrar um filme sem tempo de duração', ()=>{

  })
  it('Não deve ser possivel cadastrar um filme sem ano de lançamento', ()=>{

  })
  it('Não deve ser possivel cadastrar um filme com duração contendo letras', ()=>{

  })

  it('Não deve ser possivel cadastrar um filme com ano de lançamento contendo letras', ()=>{

  })

});
