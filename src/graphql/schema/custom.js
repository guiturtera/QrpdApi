const CustomModels = require('../../models/custom-models');
const { SchemaComposer } = require('graphql-compose');
const { addMongooseAutoCrud } = require('./merge');

let schemaComposer = new SchemaComposer();

module.exports = CustomModels()
    .then(Model => {
        for (let i = 0; i < Model.CustomModels.length; i++) {
            const customModel = Model.CustomModels[i];
            const customModelTC = Model.CustomModelsTC[i];
            const customModelName = customModel.collection.collectionName;

            schemaComposer = addMongooseAutoCrud(schemaComposer, customModelTC, `Custom.${customModelName}`);
        }

        return schemaComposer.buildSchema();
    })
    .catch(err => {
        throw err;
    });