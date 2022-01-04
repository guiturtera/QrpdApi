const mongoose = require('mongoose');
const { composeMongoose } = require('graphql-compose-mongoose');

const Schema = mongoose.Schema;

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
        enum: ['String', 'Number', 'Date', 'Boolean']
    },
    default: {
        type: Schema.Types.Mixed
    }
})

//const { updateEntity } = require('../graphql/resolvers/field')
//fieldSchema.post('save', updateEntity)

const Field = mongoose.model('Field', fieldSchema);

const customizationOptions = {};
const FieldTC = composeMongoose(Field, customizationOptions); 

module.exports.Field = Field
module.exports.FieldTC = FieldTC