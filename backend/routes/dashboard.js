import { Router } from "express";
import DashboardRepo from "../controllers/dashboard.js";
import AuthenticateUser from "../middlewares/routeAuth.js"

class  DashboardRouter {

    constructor(){
        this.router = Router();
        this.initializeRoutes()
    }

    initializeRoutes (){
        
        this.router.get('/', AuthenticateUser.protect, DashboardRepo.getDashBoard)
        this.router.get('/statistics', AuthenticateUser.protect, DashboardRepo.revenueStatistic.bind(DashboardRepo))
    }
}

export default new DashboardRouter().router