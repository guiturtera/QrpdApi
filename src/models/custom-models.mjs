import pkg from 'mongoose';
const { Schema, model } = pkg;

import { Entity } from "./entity.mjs";
import { Field } from "./field.mjs";
import { composeMongoose } from "graphql-compose-mongoose";

const CustomModels =  []
const CustomModelsTC = []

const entities = (await Entity.find());

for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    const fields = await Field.find({ entity: entity._id })
    
    if (fields.length > 0) {
        let auxSchema = new Schema({});
        fields.forEach(field => {
            const fieldObj = field._doc;

            auxSchema.add({
                [fieldObj.name]: {
                    type: fieldObj.type,
                    default: fieldObj.default,
                    re: fieldObj.ref
                }
            })
        })
        
        let createdModel = model(entity._doc.name, auxSchema);
        const customizationOptions = {};
        const createdModelTC = composeMongoose(createdModel, customizationOptions);

        CustomModels.push(createdModel);
        CustomModelsTC.push(createdModelTC);
    }
}

export {
    CustomModels, CustomModelsTC
}