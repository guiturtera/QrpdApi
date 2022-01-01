const app = require('../../src/server');
const supertest = require("supertest");
const { connect, closeDatabase, clearDatabase } = require('../mocks/db-handler')
const { createUsers } = require('../mocks/data');

const request = supertest(app);
beforeAll(async () => {
  await connect();
  await createUsers();
})

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
})

const testValidResolver = (testText, content) => {
  test(testText, (done) => {
    request.post('/graphql').set("Accept", "application/json")
      .send(content)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
      if (err) return done(err);
      done();
    });
  });
}

describe("Expect all valid query endpoints to return 200 and a valid json.", () => {
  describe("User Resolvers", () => {
    testValidResolver("Get all users (Users)", { query: "{ Users { username } }" });
    testValidResolver("Get users count (UsersCount)", { query: "{ UsersCount }" });      
  })
});

