import { SchemaComposer, ObjectTypeComposer } from "graphql-compose";
import { UserTC } from "../../models/user.mjs";
import { login, isValid } from "../resolvers/auth.mjs";

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
            type: 'String!',
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

const IsValidTokenTC = ObjectTypeComposer.create({
    name: 'IsValidToken',
    fields: {
        valid: {
            type: "Boolean"
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
    },
    [`Auth.JWT.IsValid`]: {
        type: IsValidTokenTC,
        resolve: isValid
    }
});

export default schemaComposer.buildSchema();