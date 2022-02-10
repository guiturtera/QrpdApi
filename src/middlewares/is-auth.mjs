import { isValidToken } from "../helpers/auth.mjs";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const { valid, decodedToken } = isValidToken(authHeader)

    if (!valid) {
        req.isAuth = false
        return next()
    }

    req.isAuth = true;
    req.userId = decodedToken.userId;
    req.roles = decodedToken.roles;
    req.username = decodedToken.username;
    next();
}