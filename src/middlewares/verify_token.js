import jwt from 'jsonwebtoken';
import { notAuth } from "./handle_errors";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return notAuth('Require authorization', res);
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if(err) return notAuth('Access token may be expored or invalid', res)
        
        req.user = user;
        next()
    })
}