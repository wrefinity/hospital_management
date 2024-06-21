import TestService from "../services/test.js"
import { definedRole } from "../models/user.js"

class TestRepo {

    // Controller to create a new test
    async createTest(req, res) {
        try {
            const createdBy = req.user?._id;
            const patient = req.params?.patientId;
            if (!createdBy) return res.status(400).json({ message: "kindly login" })
            if (!patient) return res.status(403).json({ message: "kindly supply the patientId" })
            const test = await TestService.createTest({ ...req.body, createdBy, patient });
            res.status(201).json({test, message:"record created successfully"});
        } catch (error) {

            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    // Controller to get a single test by ID
    async getTest(req, res) {
        try {
            const id = req.params?.id;
            if (!id) return res.status(400).json({ message: "kindly supply the test id" });
            const test = await TestService.getTestById(id);
            if (!test) {
                return res.status(404).json({ message: 'Test not found' });
            }
            res.status(200).json({ test });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    // Controller to update a test by ID
    async updateTest(req, res) {
        try {
            const id = req.params?.id;
            const body = req.body;
            if (!body) return res.status(400).json({ message: "kindly supply the parameter to update" });
            if (!id) return res.status(400).json({ message: "kindly supply the test id" });
            const test = await TestService.updateTest(id, body);
            if (!test) {
                return res.status(404).json({ message: 'Test not found' });
            }
            res.status(200).json({ test, message: "test updated" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Controller to delete a test by ID
    async deleteTest(req, res) {
        try {
            const id = req.params?.id;
            if (!id) return res.status(400).json({ message: "kindly supply the test id" })

            const test = await TestService.deleteTest(id);
            if (!test) {
                return res.status(404).json({ message: 'Test not found' });
            }
            return res.status(200).json({ test, message: 'Test deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // get test base on users
    async getAllTests(req, res) {
        try {
            const user = req.user;
            let tests = null;
            if (!user) return res.status(400).json({ message: "kindly login" })

            if (user?.activeRole == definedRole[0]) { // patient
                tests = await TestService.getUsersTests({ patient: user?._id });
            } else if (user?.activeRole == definedRole[definedRole.length - 1]) { // admins
                tests = await TestService.getTests();
            } else { // doctors, nurse, pharmacy
                tests = await TestService.getUsersTests({ createdBy: user?._id });
            }
            res.status(200).json({ tests });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


}



export default new TestRepo()