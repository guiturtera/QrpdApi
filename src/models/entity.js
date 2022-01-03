const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { composeMongoose } = require('graphql-compose-mongoose');

const Schema = mongoose.Schema;

const entitySchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    fields: [{
        type: Schema.Types.ObjectId,
        ref: 'Field',
    }]
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

module.exports.Entity = Entity
module.exports.EntityTC = EntityTC