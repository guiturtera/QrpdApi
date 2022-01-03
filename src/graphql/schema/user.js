const { UserTC } = require('../../models/user');

const { SchemaComposer } = require('graphql-compose');
const { addMongooseAutoCrud } = require('./merge');

let schemaComposer = new SchemaComposer();

UserTC.removeField('password');
schemaComposer = addMongooseAutoCrud(schemaComposer, UserTC, 'Users');

module.exports = schemaComposer.buildSchema();