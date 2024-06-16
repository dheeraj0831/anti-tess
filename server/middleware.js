// const { JWT_SECERT } = require("../config");
import dotenv from "dotenv";
dotenv.config();
const jwt = require("jsonwebtoken");
const  authMiddleware = (req, res, next) => {
    const JWT_SECERT = process.env.JWT_SECERT
    console.log(JWT_SECERT)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({msg: "please check your login credentials"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECERT);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
}

export default { 
    authMiddleware
};