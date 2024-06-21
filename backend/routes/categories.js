import { Router } from "express";
import CategoryRepo from "../controllers/categories.js";
import AuthenticateUser from "../middlewares/routeAuth.js"

class  CategoriesRouter {

    constructor(){
        this.router = Router();
        this.initializeRoutes()
    }

    initializeRoutes (){
        this.router.post('/', AuthenticateUser.protect, CategoryRepo.createCategories)
        this.router.get('/', CategoryRepo.getCategories)
        this.router.get('/:id', CategoryRepo.getCategoryById)
        this.router.patch('/:id',AuthenticateUser.protect, CategoryRepo.updateCategory)
        this.router.delete('/:id', AuthenticateUser.protect, CategoryRepo.deleteCategory)
    }
}

export default new CategoriesRouter().router