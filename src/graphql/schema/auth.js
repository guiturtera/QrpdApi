const { SchemaComposer } = require('graphql-compose');
const { login } = require('../resolvers/auth');

const schemaComposer = new SchemaComposer();

const LoginInputTC = schemaComposer.createInputTC(`
    input LoginInput {
        username: String!
        password: String!
    }
`)

const TokenTC = schemaComposer.createObjectTC(`
    type Token {
        token: String!
    }
`)

schemaComposer.Query.addFields({
    login: {
        type: TokenTC,
        resolve: login,
        args: {
            loginInput: LoginInputTC
        }
    }
});

module.exports = schemaComposer;