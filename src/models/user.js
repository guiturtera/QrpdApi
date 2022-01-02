const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

module.exports = mongoose.model('User', userSchema);