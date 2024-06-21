import { Router } from 'express';
import TestRepo from '../controllers/test.js';
import AuthenticateUser from '../middlewares/routeAuth.js';
class TestRouter {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Endpoint to create a new test
    this.router.post('/:patientId', AuthenticateUser.protect, TestRepo.createTest.bind(TestRepo));

    // Endpoint to get a single test by ID
    this.router.get('/:id', AuthenticateUser.protect, TestRepo.getTest.bind(TestRepo));

    // Endpoint to update a test by ID
    this.router.patch('/:id', AuthenticateUser.protect, TestRepo.updateTest.bind(TestRepo));

    // Endpoint to delete a test by ID
    this.router.delete('/:id', AuthenticateUser.protect, TestRepo.deleteTest.bind(TestRepo));

    // Endpoint to get all tests based on user role
    this.router.get('/', AuthenticateUser.protect, TestRepo.getAllTests.bind(TestRepo));
  }
}

export default new TestRouter().router;
