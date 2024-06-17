import { faker } from "@faker-js/faker";

describe("Encontrar usuário", () => {
  let userName;
  let userEmail;
  let password;
  let uId;
  let uToken;

  beforeEach(() => {
    userName = faker.person.fullName();
    userEmail = faker.internet.email().toLowerCase();
    password = faker.internet.password({ length: 10 });

    cy.createUser(userName, userEmail, password).then((response) => {
      uId = response.body.id;
    });
    cy.login(userEmail, password).then((response) => {
      uToken = response.body.accessToken;
    });
  });

  afterEach(() => {
    cy.promoteAdmin(uToken);
    cy.deleteUser(uId, uToken);
  });

  it("Qualquer usuário é capaz de encontrar sua própria conta por meio do id", () => {
    cy.request({
      method: "GET",
      url: "users/" + uId,
      headers: {
        Authorization: `Bearer ${uToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.equal(uId);
      expect(response.body.name).to.equal(userName);
      expect(response.body.email).includes(userEmail);
      expect(response.body).to.have.property("type");
      expect(response.body).to.have.property("active");
    });
  });

  it("Administrador pode encontrar outros usuários", () => {
    let name = faker.person.firstName();
    let email = faker.internet.email().toLowerCase();
    cy.promoteAdmin(uToken);
    cy.createUser(name, email, "1234567").then((response) => {
      cy.wrap(response.body).as("body");
    });
    cy.get("@body").then((body) => {
      cy.request({
        method: "GET",
        url: "users/" + body.id,
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(body.id);
        expect(response.body.name).to.equal(name);
        expect(response.body.email).to.equal(email);
        expect(response.body).to.have.property("type");
        expect(response.body).to.have.property("active");
      });
    });
  });

  it("Não deve ser possível encontrar usuário deletado", () => {
    let id;
    cy.promoteAdmin(uToken);
    cy.createUser(
      faker.person.fullName(),
      faker.internet.email(),
      "123456"
    ).then((response) => {
      id = response.body.id;
      cy.deleteUser(id, uToken);
      cy.request({
        method: "GET",
        url: "users/" + id,
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      }).then((response) => {
        expect(response.body).not.contain(uId);
        expect(response.body).not.contain(userName);
        expect(response.body).not.contain(userEmail);
      });
    });
  });

  it("Não deve ser possível encontrar usuário por meio de outros dados", () => {
    cy.promoteAdmin(uToken);
    cy.request({
      method: "GET",
      url: "users/" + userEmail,
      headers: {
        Authorization: `Bearer ${uToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.statusCode).to.equal(400);
      expect(response.body.error).to.equal("Bad Request");
      expect(response.body.message).to.equal(
        "Validation failed (numeric string is expected)"
      );
    });
  });

  it("Um usuário do tipo comum não deve encontrar outros usuários", () => {
    let name = faker.person.firstName();
    let email = faker.internet.email().toLowerCase();
    cy.createUser(name, email, "1234567").then((response) => {
      cy.wrap(response.body).as("body");
    });
    cy.get("@body").then((body) => {
      cy.request({
        method: "GET",
        url: "users/" + body.id,
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal("Forbidden");
      });
    });
  });

  it("Um usuário do tipo crítico não deve encontrar outros usuários", () => {
    let name = faker.person.firstName();
    let email = faker.internet.email().toLowerCase();
    cy.promoteCritic(uToken);
    cy.createUser(name, email, "1234567").then((response) => {
      cy.wrap(response.body).as("body");
    });
    cy.get("@body").then((body) => {
      cy.request({
        method: "GET",
        url: "users/" + body.id,
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal("Forbidden");
        expect(response.body.statusCode).to.equal(403);
      });
    });
  });
});
