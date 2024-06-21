import { Router } from 'express';
import MedicalHistoryController from '../controllers/medicals.js';
import AuthenticateUser from '../middlewares/routeAuth.js';
class MdeicalHistoryRouter {
  
    constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Endpoint to create a new test
    this.router.post('/:patientId', AuthenticateUser.protect, MedicalHistoryController.createMedicalHistory.bind(MedicalHistoryController));

    // Endpoint to get a single medical history ID
    this.router.get('/:id', AuthenticateUser.protect, MedicalHistoryController.getMedicalHistory.bind(MedicalHistoryController));

    // Endpoint to update a medical history by ID
    this.router.patch('/:id', AuthenticateUser.protect, MedicalHistoryController.updateMedicalHistory.bind(MedicalHistoryController));

    // Endpoint to delete a test by ID
    this.router.delete('/:id', AuthenticateUser.protect, MedicalHistoryController.deleteMedicalHistory.bind(MedicalHistoryController));

    // Endpoint to get all medical history based on user role
    this.router.get('/', AuthenticateUser.protect, MedicalHistoryController.getAllMedicalHistories.bind(MedicalHistoryController));
  }
}

export default new MdeicalHistoryRouter().router;