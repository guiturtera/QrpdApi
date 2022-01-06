import mongoose from "mongoose";

import { composeMongoose } from "graphql-compose-mongoose";

const Schema = mongoose.Schema;

const entitySchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    }
})

//entitySchema.plugin(uniqueValidator, { message: 'Error, {PATH} with value = "{VALUE}" already exists.' });
const Entity = mongoose.model('Entity', entitySchema);

const customizationOptions = {
    inputType: {
        removeFields: [
            'fields'
        ]
    }
};
const EntityTC = composeMongoose(Entity, customizationOptions); 

export {
    Entity, EntityTC   
}