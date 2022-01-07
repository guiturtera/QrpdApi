import mongoose from 'mongoose';
import { composeMongoose } from "graphql-compose-mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { Entity } from './entity.mjs'

const Schema = mongoose.Schema;

const entitiesFound = await Entity.find();
const entitiesNames = entitiesFound.map(x => x.name);

let defaultSingleValue = {
    create: false,
    read: false,
    update: false,
    delete: false,
}

const singleSchema = new Schema({
    create: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    },
    update: {
        type: Boolean,
        default: false
    },
    delete: {
        type: Boolean,
        default: false
    }
}, { _id : false })

const roleSchema = new Schema({
    User: {
        type: singleSchema,
        default: defaultSingleValue
    },
    Profile: {
        type: singleSchema,
        default: defaultSingleValue
    },
    Entity: {
        type: singleSchema,
        default: defaultSingleValue
    },
    Field: {
        type: singleSchema,
        default: defaultSingleValue
    }

}, { _id : false })

entitiesNames.forEach(name => {
    roleSchema.add({
        [name]: {
            type: singleSchema,
            default: defaultSingleValue
        }
    })
})

const roleProfileSchema = new Schema({
    name: {
        type: String,
        unique: true,
        index: true
    },
    roles: {
        type: roleSchema
    }
});


roleProfileSchema.plugin(uniqueValidator, { message: 'Error, {PATH} with value = "{VALUE}" already exists.' });

const Profile = mongoose.model('Profile', roleProfileSchema, 'Profile');


const customizationOptions = {};
const ProfileTC = composeMongoose(Profile, customizationOptions); 

export {
    Profile, ProfileTC
}
