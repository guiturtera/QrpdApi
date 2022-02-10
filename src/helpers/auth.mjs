import jwt from "jsonwebtoken";

export const isValidToken = (rawToken) => {
    const splittedToken = rawToken.split(' '); // Bearer token
    if (splittedToken.length <= 1) {
        return { valid: false, decodedToken: null }
    }
    const token = splittedToken[1]
    if (!token || token === '') {
        return { valid: false, decodedToken: null }
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return { valid: false, decodedToken: null }
    }

    if (!decodedToken) {
        return { valid: false, decodedToken: null }
    }

    return { valid: true, decodedToken: decodedToken }
}