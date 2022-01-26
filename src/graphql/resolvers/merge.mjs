import { Resolver } from "graphql-compose";

export const getExpanderArrayRelationship = (modelRelated, modelTCRelated, schemaComposer) => {
    
    return new Resolver({
        name: `expandGenericRelationship${modelRelated.collection.collectionName}`,
        type: [modelTCRelated],
        resolve: async (source) => {
          let ids = await source.args.content
          let customObjects = []
          for (let i = 0; i < ids.length; i++){
            let res = await modelRelated.findById(ids[i]);
            customObjects.push(res);
          }
          return customObjects
        },
      }, schemaComposer);
}

export const getExpanderSingleRelationship = (modelRelated, modelTCRelated, schemaComposer) => {
  return new Resolver({
      name: `expandGenericRelationship${modelRelated.collection.collectionName}`,
      type: modelTCRelated,
      resolve: async (source) => {
        let id = await source.args.content
        if (id) {
          return await modelRelated.findById(id);
        }
      },
    }, schemaComposer);
}