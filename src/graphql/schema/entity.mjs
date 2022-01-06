import { EntityTC } from "../../models/entity.mjs";
import { FieldTC } from "../../models/field.mjs";

import { getFieldsFromEntity } from "../resolvers/field.mjs";

import { SchemaComposer } from "graphql-compose";
import { addMongooseAutoCrud } from "./merge.mjs";

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


export default schemaComposer.buildSchema();