import { CustomModels, CustomModelsTC } from "../../models/custom-models.mjs";
import { SchemaComposer } from "graphql-compose";
import { addMongooseAutoCrud } from "./merge.mjs";

let schemaComposer = new SchemaComposer();

for (let i = 0; i < CustomModels.length; i++) {
    const customModel = CustomModels[i];
    const customModelTC = CustomModelsTC[i];
    const customModelName = customModel.collection.collectionName;

    schemaComposer = addMongooseAutoCrud(schemaComposer, customModelTC, `Custom.${customModelName}`);
}

export default schemaComposer.buildSchema();