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
        value: {
            type: 'String!', 
            required: true
        },
        expiration: {
            type: 'Int!',
            required: true
        }
    }
}, schemaComposer)

const AssociativeTokenTC = ObjectTypeComposer.create({
    name: 'AssociativeToken',
    fields: {
        user: {
            type: UserTC
        },
        token: {
            type: TokenTC
        }
    }
  }, schemaComposer);

schemaComposer.Query.addNestedFields({
    [`Auth.JWT.Login`]: {
        type: AssociativeTokenTC,
        resolve: login,
        args: {
            loginInput: LoginInputTC
        }
    }
});

module.exports = schemaComposer.buildSchema();