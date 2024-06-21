import { Router } from "express";
import UserRepo from "../controllers/users.js";
import AuthenticateUser from '../middlewares/routeAuth.js';

class  UsersRouter {

    constructor(){
        this.router = Router();
        this.initializeRoutes()
    }

    initializeRoutes (){
        this.router.get('/', AuthenticateUser.protect, UserRepo.getUsers.bind(UserRepo))
        this.router.get('/:id', AuthenticateUser.protect,  UserRepo.getUserById.bind(UserRepo))
        this.router.put('/:id', AuthenticateUser.protect,  UserRepo.updateUser.bind(UserRepo))
        this.router.delete('/:id', AuthenticateUser.protect, UserRepo.deleteUser.bind(UserRepo))
    }
}

export default new UsersRouter().router