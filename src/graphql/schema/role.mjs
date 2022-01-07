import { RoleTC } from "../../models/role.mjs";
import { SchemaComposer } from "graphql-compose";
import { addMongooseAutoCrud } from "./merge.mjs";

let schemaComposer = new SchemaComposer();

schemaComposer = addMongooseAutoCrud(schemaComposer, RoleTC, 'Roles');

export default schemaComposer.buildSchema();