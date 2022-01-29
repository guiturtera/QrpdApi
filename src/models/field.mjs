import mongoose from "mongoose";
import { timestampFields } from "../helpers/graphql.mjs"
import { Entity } from "./entity.mjs";
import { composeMongoose } from "graphql-compose-mongoose";

const Schema = mongoose.Schema;

const entitiesFound = await Entity.find();
const entitiesNames = entitiesFound.map(ent => ent.name);
entitiesNames.push('User');

const fieldSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    entity: {
        type: Schema.Types.ObjectId,
        ref: 'Entity',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['String', 'Number', 'Date', 'Boolean', 'ObjectId', '[ObjectId]']
    },
    default: {
        type: Schema.Types.Mixed,
        validate: {
            validator: function(v) {
                if (typeof v === this.type.toLowerCase()){
                    return true
                }
                return false;
            },
            message: props => `Default value must be compatible to the choosen type!
For now, default property is only available for 'String', 'Number', and 'Boolean'`
        }
    },
    ref: {
        type: String,
        enum: entitiesNames
    }
}, { timestamps: true })

//const { updateEntity } = require('../graphql/resolvers/field')
//fieldSchema.post('save', updateEntity)

const Field = mongoose.model('Field', fieldSchema);

const customizationOptions = {
    inputType: {
        removeFields: [
            ...timestampFields
        ]
    }
};
const FieldTC = composeMongoose(Field, customizationOptions); 

export {
    Field, FieldTC
}