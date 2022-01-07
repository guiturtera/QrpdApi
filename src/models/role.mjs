import mongoose from 'mongoose';
import { composeMongoose } from "graphql-compose-mongoose";

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {
        type: String,
    }
});

const Role = mongoose.model('Role', roleSchema);

const customizationOptions = {};
const RoleTC = composeMongoose(Role, customizationOptions); 

export {
    Role, RoleTC
}
