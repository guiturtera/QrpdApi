const { EntityTC } = require('../../models/entity');
const { FieldTC } = require('../../models/field');

const { SchemaComposer } = require('graphql-compose');
const { addMongooseAutoCrud } = require('./merge');

let schemaComposer = new SchemaComposer();

EntityTC.addRelation(
    'fields',
    {
    resolver: () => FieldTC.mongooseResolvers.dataLoaderMany(),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.fields,
    },
    projection: { fields: 1 }, // point fields in source object, which should be fetched from DB
    }
);

schemaComposer = addMongooseAutoCrud(schemaComposer, EntityTC, 'Entities');

module.exports = schemaComposer.buildSchema();