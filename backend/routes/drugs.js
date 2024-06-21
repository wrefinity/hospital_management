import { Router } from "express";
import DrugRepo from "../controllers/drugs.js";
import AuthenticateUser from "../middlewares/routeAuth.js"

class  DrugRouter {

    constructor(){
        this.router = Router();
        this.initializeRoutes()
    }

    initializeRoutes (){
        this.router.post('/', AuthenticateUser.protect, DrugRepo.createDrug.bind(DrugRepo))
        this.router.get('/', DrugRepo.getDrugs.bind(DrugRepo))
        this.router.get('/:id', DrugRepo.getDrugById.bind(DrugRepo))
        this.router.patch('/:id', AuthenticateUser.protect, DrugRepo.updateDrugs.bind(DrugRepo))
        this.router.patch('/decrement/:id', AuthenticateUser.protect, DrugRepo.decrementDrug.bind(DrugRepo))
        this.router.patch('/increment/:id', AuthenticateUser.protect, DrugRepo.incrementDrug.bind(DrugRepo))
        this.router.delete('/:id', AuthenticateUser.protect, DrugRepo.deleteDrug.bind(DrugRepo))
    }
}

export default new DrugRouter().router