import jwt from 'jsonwebtoken';
import '../loadEnv.js'

export default class JwtAuth {

    constructor() {
        this.secret_key = process.env.JWT_SECRET;
    }

    // jwt token verifications
    verifyJWT = (token) => {

        // console.log('Token to verify:', token);
        return jwt.verify(token, this.secret_key);

    }

    // create jwt token
    createJWT = (payload) => {
        return jwt.sign(payload, this.secret_key, {
            expiresIn: '1d',
        });
    }
}

