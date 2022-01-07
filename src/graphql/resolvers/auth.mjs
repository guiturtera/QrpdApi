import { User } from "../../models/user.mjs";
import { Profile } from "../../models/profile.mjs";
import jwt from "jsonwebtoken";

const login = async (source, args) => {
    const user = await
    User.findOne({ username: args.loginInput.username });
    if (user) {
        let password = args.loginInput.password
        let isMatch = await user.comparePassword(password)
        if (isMatch) {
            const roles = (await Profile.findById(user.profile))._doc.roles;
            const expiration = '2h';
            const token = jwt.sign(
                { userId: user._id, username: user.username, roles: roles },
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

const authWrapper = (resolversConfig, modelName) => {
    let resolvers = {};
    Object.keys(resolversConfig).forEach((k) => {
      resolvers[k] = resolversConfig[k].resolver.wrapResolve(next => async rp => {
          if (!rp.context.isAuth) {
            throw new Error('You must login to view this.');
          }
          let userHasAccess;
          try {
            userHasAccess = rp.context.roles[modelName][resolversConfig[k].role];
          } catch {
            throw new Error('Error finding role configuration');
          }
          console.log(rp.context.roles)
          if (!userHasAccess) {
            throw new Error('Access denied.');
          }

          return next(rp)
      })
    })
    return resolvers
  }


export {
    login, authWrapper
}