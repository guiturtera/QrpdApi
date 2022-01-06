import mongoose from "mongoose";
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
        enum: ['String', 'Number', 'Date', 'Boolean', 'ObjectId']
    },
    default: {
        type: Schema.Types.Mixed,
    },
    ref: {
        type: String,
        enum: entitiesNames
    }
})

//const { updateEntity } = require('../graphql/resolvers/field')
//fieldSchema.post('save', updateEntity)

const Field = mongoose.model('Field', fieldSchema);

const customizationOptions = {};
const FieldTC = composeMongoose(Field, customizationOptions); 

export {
    Field, FieldTC
}