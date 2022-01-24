import { CustomModels, CustomModelsTC } from "../../models/custom-models.mjs";
import { SchemaComposer } from "graphql-compose";
import { addMongooseAutoCrud } from "./merge.mjs";
import { authWrapper } from "../resolvers/auth.mjs";
import { findBySearchIndex } from "../resolvers/custom.mjs";

let schemaComposer = new SchemaComposer();

for (let i = 0; i < CustomModels.length; i++) {
    const customModel = CustomModels[i];
    const customModelTC = CustomModelsTC[i];
    const customModelName = customModel.collection.collectionName;

    schemaComposer = addMongooseAutoCrud(schemaComposer, customModelTC, `Custom.${customModelName}`);
    schemaComposer.Query.addNestedFields(
        authWrapper({
            "Test": {
                resolver: findBySearchIndex,
                role: "any"
            }
    }))
}

export default schemaComposer.buildSchema();