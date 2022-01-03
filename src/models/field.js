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
        ref: 'Entity'
    }
})

const Field = mongoose.model('Field', fieldSchema);

const customizationOptions = {};
const FieldTC = composeMongoose(Field, customizationOptions); 

module.exports.Field = Field
module.exports.FieldTC = FieldTC