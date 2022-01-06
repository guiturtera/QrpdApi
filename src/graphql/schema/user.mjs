import { UserTC } from "../../models/user.mjs";

import { SchemaComposer } from "graphql-compose";
import { addMongooseAutoCrud } from "./merge.mjs";

let schemaComposer = new SchemaComposer();

UserTC.removeField('password');
schemaComposer = addMongooseAutoCrud(schemaComposer, UserTC, 'Users');


export default schemaComposer.buildSchema();