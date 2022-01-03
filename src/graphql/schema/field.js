const { FieldTC } = require('../../models/field');

const { SchemaComposer } = require('graphql-compose');
const { addMongooseAutoCrud } = require('./merge');

let schemaComposer = new SchemaComposer();

schemaComposer = addMongooseAutoCrud(schemaComposer, FieldTC, 'Fields');
//const aux = schemaComposer.getResolveMethods().MutationFields

module.exports = schemaComposer.buildSchema();