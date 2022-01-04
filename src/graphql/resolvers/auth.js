const { User } = require('../../models/user');

module.exports.login = async (source, args) => {
    const user = await
    User.findOne({ username: args.loginInput.username });
    if (user) {
        let password = args.loginInput.password
        let isMatch = await user.comparePassword(password)
        if (isMatch) {
            return {
                token: {
                    value: args.loginInput.username,
                    expiration: 2
                },
                user: user.getFormattedUser()
            }
        }
    }
    throw new Error("Incorrect username/password");
}