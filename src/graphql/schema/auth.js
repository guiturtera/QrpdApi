const { SchemaComposer, ObjectTypeComposer } = require('graphql-compose');
const { UserTC } = require('../../models/user');
const { login } = require('../resolvers/auth');

const schemaComposer = new SchemaComposer();

const LoginInputTC = schemaComposer.createInputTC(`
    input LoginInput {
        username: String!
        password: String!
    }
`)

const TokenTC = ObjectTypeComposer.create({
    name: 'Token',
    fields: {
        user: {
            type: UserTC
        },
        token: {
            type: 'String'
        }
    }
  }, schemaComposer);

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