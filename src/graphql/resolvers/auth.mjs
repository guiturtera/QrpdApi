import { User } from "../../models/user.mjs";
import jwt from "jsonwebtoken";

export async function login (source, args) {
    const user = await
    User.findOne({ username: args.loginInput.username });
    if (user) {
        let password = args.loginInput.password
        let isMatch = await user.comparePassword(password)
        if (isMatch) {
            const expiration = '2h';
            const token = jwt.sign(
                { userId: user._id, username: user.username},
                process.env.JWT_SECRET,
                { expiresIn: expiration });
            return {
                token: {
                    value: token,
                    expiration: expiration
                },
                user: user.getFormattedUser()
            }
        }
    }
    throw new Error("Incorrect username/password");
}