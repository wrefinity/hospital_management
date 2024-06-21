// import CustomError from "../utils/customError";
import JwtAuth from "./jswt.js";
import User, { definedRole } from "../models/user.js";

class AuthenticateUser {

    constructor() {
        this.jwtAuth = new JwtAuth()
    }

    protect = async (req, res, next) => {
        let token = null;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies) {
            token = req.cookies.access_token;
        }

        
        try {

            if (!token || token == null || token == undefined) return res.status(401).json({ message: "Auth Token required" });
            const decoded = this.jwtAuth.verifyJWT(token);
            if (!decoded) return res.status(401).json({ message: "Invalid token or user doesn't exist" });

            const user = await User.findById(decoded._id);
            if (!user) return res.status(401).json({ message: "User with that token no longer exists" });

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: error.message || "Invalid token or user doesn't exist" });
        }
    }

    isBuyer = (req, res, next) => {
        protect(req, res, async () => {
            if (req.user && req.user.activeRole === definedRole[0]) {
                return next();
            } else {
                return res.status(401).json({ message: "Not authorized, only reviewer can access this router" });
            }
        });
    };
    isAdmin = (req, res, next) => {
        protect(req, res, async () => {
            if (req.user && req.user.activeRole === definedRole[1]) {
                return next();
            } else {
                return res.status(401).json({ message: "Not authorized, only reviewer can access this router" });
            }
        });
    };
}

export default new AuthenticateUser()