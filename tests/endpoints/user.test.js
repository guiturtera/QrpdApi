const startApp = require('../../src/server');
const supertest = require("supertest");
const { connect, closeDatabase, clearDatabase } = require('../db-handler')

var app = startApp(connect);

const request = supertest(app);

afterAll(async () => {
    await server.close();
    //await clearDatabase();
    //await closeDatabase();
})

test('fetch users', async (done) => {
    request
    .post("/user")
    .send({
      query: "{ findMany { username } }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.users.length).toEqual(3);
      done();
    });
})
