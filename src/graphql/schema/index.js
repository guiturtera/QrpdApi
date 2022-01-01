const { mergeSchemas } = require('@graphql-tools/schema');
const userSchema = require('./user');

module.exports = mergeSchemas({
    schemas: [
        userSchema
    ]
});