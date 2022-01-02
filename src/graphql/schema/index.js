const { SchemaComposer } = require('graphql-compose');
const userSchemaComposer = require('./user');
const authSchemaComposer = require('./auth')

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
    ...userSchemaComposer.Query.getFields(), 
    ...authSchemaComposer.Query.getFields()
})

schemaComposer.Mutation.addFields({
    ...userSchemaComposer.Mutation.getFields(), 
    ...authSchemaComposer.Mutation.getFields()
})

module.exports = schemaComposer.buildSchema();