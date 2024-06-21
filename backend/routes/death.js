import { Router } from 'express';
import DeathController from '../controllers/death.js';
import AuthenticateUser from '../middlewares/routeAuth.js';

class DeathRouter {
  
    constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Endpoint to create a new death record
    this.router.post('/:patientId', AuthenticateUser.protect, DeathController.createDeath.bind(DeathController));

    // Endpoint to get a single death record ID
    this.router.get('/:id', AuthenticateUser.protect, DeathController.getDeathById.bind(DeathController));

    // Endpoint to update a death record by ID
    this.router.patch('/:id', AuthenticateUser.protect, DeathController.updateDeath.bind(DeathController));

    // Endpoint to delete a death record by ID
    this.router.delete('/:id', AuthenticateUser.protect, DeathController.deleteDeath.bind(DeathController));

    // Endpoint to get all death records based on user role
    this.router.get('/', AuthenticateUser.protect, DeathController.getAllDeaths.bind(DeathController));
  }
}

export default new DeathRouter().router;