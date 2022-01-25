import { CustomModels, CustomModelsTC } from "../../models/custom-models.mjs";
import { SchemaComposer } from "graphql-compose";
import { addMongooseAutoCrud } from "./merge.mjs";
import { authWrapper } from "../resolvers/auth.mjs";
import { findBySearchIndex } from "../resolvers/custom.mjs";
import { Entity } from "../../models/entity.mjs";
import { Field } from "../../models/field.mjs";
import { getExpanderGenericRelationship } from "../resolvers/merge.mjs"

let schemaComposer = new SchemaComposer();

let modelsTCCreated = {}

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

    modelsTCCreated[customModelName] = { customModelTC, customModel }
}

for (const [customModelName, { customModelTC, customModel }] of Object.entries(modelsTCCreated)) {
    let entity = await Entity.findOne({ name: customModelName })
    let fields = await Field.find({ entity: entity, type: "ObjectId" })
    
    for (let j = 0; j < fields.length; j++) {
        let field = fields[j]
        let relatedModel = modelsTCCreated[field.ref].customModel
        let relatedModelTC = modelsTCCreated[field.ref].customModelTC

        customModelTC.addRelation(
            field.name,
            {
                resolver: getExpanderGenericRelationship(relatedModel, relatedModelTC, schemaComposer),
                prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
                  content: async (source) => {
                      let customModelData = await customModel.findById(source._id)
                      return customModelData._doc[field.name]
                  },
                },
            }
        ); 
    }
}

export default schemaComposer.buildSchema();