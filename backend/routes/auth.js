import { Router } from "express";
import AuthRepo from "../controllers/auth.js";
import AuthenticateUser from "../middlewares/routeAuth.js"

class AuthRouter {

    constructor(){
        this.router = Router();
        this.initializeRoutes()
    }

    initializeRoutes (){
        this.router.post('/register', AuthRepo.register.bind(AuthRepo))
        this.router.post('/login', AuthRepo.login.bind(AuthRepo))
        this.router.patch('/profile', AuthenticateUser.protect, AuthRepo.updateProfile.bind(AuthRepo))
        this.router.post('/reset-password', AuthenticateUser.protect, AuthRepo.resetPassword.bind(AuthRepo))
    }
}

export default new AuthRouter().router