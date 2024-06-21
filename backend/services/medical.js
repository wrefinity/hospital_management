import MedicalHistoryModel from "../models/medical.js";
import Profile from "../models/profile.js";

class MedicalHistoryService {

    constructor() {
        this.MedicalHistory = MedicalHistoryModel;
        this.deSelectedFields = '-password -activeRole -roles';
        this.populateCreators = {
            path: 'createdBy',
            select: this.deSelectedFields
        };
        this.populatePatients = {
            path: 'patient',
            select: this.deSelectedFields
        };
    }

    // Create a new Medical History
    async createMedicalHistory(historyData) {
        const medicalHistory = new this.MedicalHistory(historyData);
        const savedHistory = await medicalHistory.save();

        // Check if the user's profile exists
        const userProfile = await Profile.findOne({userId:historyData.patient});

        if (userProfile) {
            // Update the user's profile with the new medical history ID
            await Profile.findOneAndUpdate(
                {userId:historyData.patient},
                { $push: { medicalHistory: savedHistory._id } },
                { new: true, useFindAndModify: false }
            );
        }

        return savedHistory;
    }

    // Get medical history by ID
    async getMedicalHistoryById(id) {
        return await this.MedicalHistory.findById(id)
            .populate(this.populateCreators)
            .populate(this.populatePatients);
    }

    // Get all medical histories
    async getMedicalHistories() {
        return await this.MedicalHistory.find({isDeleted:false})
            .populate(this.populateCreators)
            .populate(this.populatePatients);
    }

    // Get medical histories either by patient or creator
    async getUsersMedicalHistories(query) {
        return await this.MedicalHistory.find({...query, isDeleted:false})
            .populate(this.populateCreators)
            .populate(this.populatePatients);
    }

    // Soft delete a medical history by ID
    async deleteMedicalHistory(id) {
        return await this.MedicalHistory.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }

    // Update a medical history by ID
    async updateMedicalHistory(id, body) {
        return await this.MedicalHistory.findByIdAndUpdate(id, body, { new: true });
    }

}

export default new MedicalHistoryService();
