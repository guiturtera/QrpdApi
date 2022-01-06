import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.isAuth = false;
        return next();
    }

    const token = authHeader.split(' ')[1]; // Bearer token
    if (!token || token === '') {
        req.isAuth = false
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    req.isAuth = true;
    req.userId = decodedToken.userId;
    req.username = decodedToken.username;
    console.log(req.userId)
    console.log(req.username)
    next();
}