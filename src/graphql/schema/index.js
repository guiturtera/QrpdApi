const { mergeSchemas } = require('@graphql-tools/schema');

const userSchema = require('./user');
const authSchema = require('./auth');
const entitySchema = require('./entity');
const fieldSchema = require('./field');

module.exports = mergeSchemas({
    schemas: [ userSchema, authSchema, entitySchema, fieldSchema ]
});