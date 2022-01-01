const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
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

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);