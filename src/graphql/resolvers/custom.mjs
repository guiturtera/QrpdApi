import { Resolver } from "graphql-compose";
import { CustomModels, CustomModelsTC } from "../../models/custom-models.mjs";

import { SchemaComposer, ObjectTypeComposer } from "graphql-compose";
const schemaComposer = new SchemaComposer();


const AssociativeCustomEntitiesTC = ObjectTypeComposer.create({ name: "AssociativeCustomEntities" }, schemaComposer);

CustomModelsTC.forEach(customModel => { 
    AssociativeCustomEntitiesTC.addFields({ [customModel._gqType.name]: { type: [customModel] }})
})


export const findBySearchIndex = new Resolver({
    name: 'getFieldsFromEntity',
    type: AssociativeCustomEntitiesTC,
    resolve: async (source) => {
      let entitiesStorage = {}
      for (let i = 0; i < CustomModels.length; i++){
        let modelName = CustomModelsTC[i]._gqType.name;
        entitiesStorage[modelName] = await CustomModels[i].find({ SearchIndex: "ola" });
      }
      
      return entitiesStorage
    },
  }, schemaComposer);