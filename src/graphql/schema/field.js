const { FieldTC } = require('../../models/field');

const { SchemaComposer } = require('graphql-compose');
const { addMongooseAutoCrud } = require('./merge');

let schemaComposer = new SchemaComposer();

schemaComposer = addMongooseAutoCrud(schemaComposer, FieldTC, 'Fields');

module.exports = schemaComposer.buildSchema();