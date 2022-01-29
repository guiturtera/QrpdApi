import mongoose from "mongoose";
import { timestampFields } from "../helpers/graphql.mjs"
import { Entity } from "./entity.mjs";
import { composeMongoose } from "graphql-compose-mongoose";
import { nameValidator } from "./validators/field.mjs"

const Schema = mongoose.Schema;

const entitiesFound = await Entity.find();
const entitiesNames = entitiesFound.map(ent => ent.name);
entitiesNames.push('User');

const fieldSchema = new Schema({
    displayName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        index: true,
        validate: [
                { 
                    validator: function(val) { 
                    return nameValidator(this, val)
                },
                    message: (props) => `Field '${props.value}' already exists!`
                },
                {
                    validator: function(val) {
                        return /^[A-Za-z]{4,}$/.test(val);
                    },
                    message: props => `The value '${props.value}' is invalid! The name field must only have simple chars and higher than 4. Regex = '^[A-Za-z]{4,}$'`
                }
            ]
        
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