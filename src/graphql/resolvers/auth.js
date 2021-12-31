const User = require('../../models/user');

const { getEvents } = require('./merge');
const bcrypt = require('bcryptjs');

module.exports = { 
    createUser: async (args) => {
        let user = await User.findOne({ email: args.userInput.email })
        if (user) {
            throw new Error('User exists already!');
        }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        user = new User({
            email: args.userInput.email,
            password: hashedPassword
        });
        const userResult = await user.save();
        return {
            ...userResult._doc, 
            createdEvents: getEvents.bind(this, userResult._doc.createdEvents)
        }  
    },
}