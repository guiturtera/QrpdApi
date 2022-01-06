import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { composeMongoose } from "graphql-compose-mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(next) {
    var user = this;
    if (!user.isModified('password')) return next();

    try {
        user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
        next();
    } catch (err) {
        return next(err)
    }
})

userSchema.methods.comparePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.getFormattedUser = function() {
    return this
};

//getFormattedObject
userSchema.plugin(uniqueValidator, { message: 'Error, {PATH} with value = "{VALUE}" already exists.' });
const User = mongoose.model('User', userSchema);

const customizationOptions = {};
const UserTC = composeMongoose(User, customizationOptions); 

export {
    User, UserTC
}
