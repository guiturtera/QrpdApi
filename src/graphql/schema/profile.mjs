import { ProfileTC } from "../../models/profile.mjs";
import { SchemaComposer } from "graphql-compose";
import { addMongooseAutoCrud } from "./merge.mjs";

let schemaComposer = new SchemaComposer();

schemaComposer = addMongooseAutoCrud(schemaComposer, ProfileTC, 'Profile');

export default schemaComposer.buildSchema();