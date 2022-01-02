const app = require('../../src/server');
const supertest = require("supertest");

const request = supertest(app);

describe('Authentication tests', () => {
    test('Fails to login when sent an invalid combination of username/password', () => {
        request.post('/graphql').set("Accept", "application/json")
      .send({ query: 
`{
Login(resolve: {
    username: "INVALID_USERNAME"
    password: "INVALID_PASSWORD"
}) {
    username
}
}` })
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err, res) => {
      if (err) return done(err);
      done();
    });
    })
})