import { FieldTC } from "../../models/field.mjs";
import { EntityTC } from "../../models/entity.mjs";

import { SchemaComposer } from "graphql-compose";
import { addMongooseAutoCrud } from "./merge.mjs";

let schemaComposer = new SchemaComposer();

schemaComposer = addMongooseAutoCrud(schemaComposer, FieldTC, 'Fields');
//const aux = schemaComposer.getResolveMethods().MutationFields

FieldTC.addRelation(
    'entity',
    {
    resolver: EntityTC.mongooseResolvers.findById(),
    prepareArgs: { 
       _id: (source) => {
        return source.entity;
    }
    },
    projection: { entity: 1 },
    }
);


export default schemaComposer.buildSchema();