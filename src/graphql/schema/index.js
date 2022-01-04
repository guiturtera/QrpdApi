const { mergeSchemas } = require('@graphql-tools/schema');

module.exports = async () => {    
    const userSchema = require('./user');
    const authSchema = require('./auth');
    const entitySchema = require('./entity');
    const fieldSchema = require('./field');
    const customSchema = await require('./custom');

    return mergeSchemas({
        schemas: [ userSchema, authSchema, entitySchema, fieldSchema, customSchema ]
    });
}