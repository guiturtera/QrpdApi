import mongoose from "mongoose";

import { timestampFields } from "../helpers/graphql.mjs"
import uniqueValidator from "mongoose-unique-validator"
import { composeMongoose } from "graphql-compose-mongoose";

const Schema = mongoose.Schema;

const entitySchema = new Schema({
    displayName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        index: true,
        unique: true,
        validate: {
            validator: function(val) {
                return /^[A-Za-z]{4,}$/.test(val);
            },
            message: props => `The value '${props.value}' is invalid! The name field must only have simple chars and higher than 4. Regex = '^[A-Za-z]{4,}$'`
        }
    }
}, { timestamps: true })

entitySchema.plugin(uniqueValidator, { message: 'Error, {PATH} with value = "{VALUE}" already exists.' });
const Entity = mongoose.model('Entity', entitySchema);

const customizationOptions = {
    inputType: {
        removeFields: [
            'fields', ...timestampFields
        ]
    }
};
const EntityTC = composeMongoose(Entity, customizationOptions); 

export {
    Entity, EntityTC   
}