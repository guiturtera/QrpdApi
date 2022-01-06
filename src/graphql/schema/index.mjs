import { mergeSchemas } from "@graphql-tools/schema";

import userSchema from "./user.mjs";
import authSchema from "./auth.mjs";
import entitySchema from "./entity.mjs";
import fieldSchema from "./field.mjs";
import customSchema from  './custom.mjs';


export default async () => {
    return mergeSchemas({
        schemas: [ userSchema, authSchema, entitySchema, fieldSchema, customSchema ]
    });
}