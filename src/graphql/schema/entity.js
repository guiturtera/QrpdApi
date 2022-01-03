const { EntityTC } = require('../../models/entity');
const { FieldTC } = require('../../models/field');

const { getFieldsFromEntity } = require('../resolvers/field');

const { SchemaComposer } = require('graphql-compose');
const { addMongooseAutoCrud } = require('./merge');

let schemaComposer = new SchemaComposer();

schemaComposer = addMongooseAutoCrud(schemaComposer, EntityTC, 'Entities');

EntityTC.addRelation(
    'fields',
    {
    resolver: getFieldsFromEntity,
    prepareArgs: { 
       entityId: (source) => {
        return source._id
    }
    },
    projection: { fields: 1 },
    }
);

module.exports = schemaComposer.buildSchema();