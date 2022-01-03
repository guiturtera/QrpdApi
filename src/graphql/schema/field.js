const { FieldTC } = require('../../models/field');
const { EntityTC } = require('../../models/entity')

const { SchemaComposer } = require('graphql-compose');
const { addMongooseAutoCrud } = require('./merge');

let schemaComposer = new SchemaComposer();

schemaComposer = addMongooseAutoCrud(schemaComposer, FieldTC, 'Fields');
//const aux = schemaComposer.getResolveMethods().MutationFields

FieldTC.addRelation(
    'entity',
    {
    resolver: EntityTC.mongooseResolvers.findById(),
    prepareArgs: { 
       _id: (source) => {
        console.log(source.entity);
        return source.entity;
    }
    },
    projection: { entity: 1 },
    }
);

module.exports = schemaComposer.buildSchema();