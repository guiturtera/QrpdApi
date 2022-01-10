import pkg from 'mongoose';
const { Schema, model } = pkg;

import { timestampFields } from "../helpers/graphql.mjs"
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
        let auxSchema = new Schema({}, { timestamps: true });
        fields.forEach(field => {
            const fieldObj = field._doc;
            let fieldConfig = {
                type: fieldObj.type,
                //default: fieldObj.default,
            }
            if (fieldObj.type == "ObjectId") {
                fieldConfig = { ...fieldConfig, ref: fieldObj.type }
            }
            auxSchema.add({
                [fieldObj.name]: fieldConfig
            })
        })
        
        let createdModel = model(entity._doc.name, auxSchema);
        const customizationOptions = {
            inputType: {
                removeFields: [
                    ...timestampFields
                ]
            }
        };
        const createdModelTC = composeMongoose(createdModel, customizationOptions);

        CustomModels.push(createdModel);
        CustomModelsTC.push(createdModelTC);
    }
}

export {
    CustomModels, CustomModelsTC
}