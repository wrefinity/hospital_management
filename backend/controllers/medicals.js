import medicalHistoryService from '../services/medical.js';
import { definedRole } from "../models/user.js";

class MedicalHistoryController {

    async createMedicalHistory(req, res) {
        try {
            const createdBy = req.user?._id;
            const patient = req.params?.patientId;
            if (!patient) return res.status(400).json({ message: "kindly supply the patientId" })
            if (!createdBy) return res.status(403).json({ message: "kindly login" })

            const history = await medicalHistoryService.createMedicalHistory({...req.body, createdBy, patient});
            res.status(201).json({history, message:"medical history created"});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getMedicalHistory(req, res) {
        try {
            const id = req.params?.id;
            if (!id) return res.status(400).json({ message: "kindly supply the history id" });
            const history = await medicalHistoryService.getMedicalHistoryById(id);
            if (!history) {
                return res.status(404).json({ message: 'Medical history not found' });
            }
            res.status(200).json({history});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllMedicalHistories(req, res) {
        try {
            const user = req.user;
            let histories = null;
            if (!user) return res.status(400).json({ message: "kindly login" })

            if (user?.activeRole == definedRole[0]) {
                histories = await medicalHistoryService.getUsersMedicalHistories({ patient: user?._id });
            }else if(user?.activeRole == definedRole[definedRole.length - 1]){
                histories = await medicalHistoryService.getMedicalHistories();
            }else {
                histories = await medicalHistoryService.getUsersMedicalHistories({ createdBy: user?._id });
            }
            res.status(200).json({histories});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateMedicalHistory(req, res) {
        try {
            const id = req.params?.id;
            const body = req.body;
            if (!body) return res.status(400).json({ message: "kindly supply the parameter to update" });
            if (!id) return res.status(400).json({ message: "kindly supply the history id" });
            const history = await medicalHistoryService.updateMedicalHistory(id, body);
            if (!history) {
                return res.status(404).json({ message: 'Medical history not found' });
            }
            res.status(200).json({history, message:'medical history updated'});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteMedicalHistory(req, res) {
        try {
            const id = req.params?.id;
            if (!id) return res.status(400).json({ message: "kindly supply the history id" });

            const history = await medicalHistoryService.deleteMedicalHistory(id);
            if (!history) {
                return res.status(404).json({ message: 'Medical history not found' });
            }
            res.status(200).json({ history, message: 'Medical history deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

export default new MedicalHistoryController();
