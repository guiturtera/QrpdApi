const { Schema, model } = require('mongoose');

const { Entity } = require('./entity');
const { Field } = require('./field');
const { composeMongoose } = require('graphql-compose-mongoose');

const CustomModels =  []
const CustomModelsTC = []

module.exports = async () => {
    const entities = (await Entity.find());
    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        const fields = await Field.find({ entity: entity._id })
        
        let auxSchema = new Schema();
        fields.forEach(field => {
            const fieldObj = field._doc;

            auxSchema.add({
                [fieldObj.name]: {
                    type: fieldObj.type,
                    default: fieldObj.default,
                }
            })
        })
        
        let createdModel = model(entity._doc.name, auxSchema);
        const customizationOptions = {};
        const createdModelTC = composeMongoose(createdModel, customizationOptions);

        CustomModels.push(createdModel);
        CustomModelsTC.push(createdModelTC);
    }
    
    return {
        CustomModels,
        CustomModelsTC
    }
}


