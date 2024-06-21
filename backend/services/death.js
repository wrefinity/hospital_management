import DeathModel from '../models/death.js';
import Profile from '../models/profile.js';

class DeathService {

    constructor() {
        this.Death = DeathModel;
        this.deSelectedFields = '-password -activeRole -roles';
        this.populateCreators = {
            path: 'createdBy',
            select: this.deSelectedFields,
        };
        this.populatePatients = {
            path: 'patient',
            select: this.deSelectedFields,
            populate: { path: "profile" }
        };
    }

    async createDeath(deathData) {
        const death = new this.Death(deathData);
        const savedDeath = await death.save();

        const existingProfile = await Profile.findOne({ userId: deathData?.patient });

        if (existingProfile) {
            await Profile.findOneAndUpdate(
                { userId: deathData?.patient },
                { death: savedDeath._id },
                { new: true }
            );
        }
        return savedDeath;
    }

    async getDeaths() {
        return await this.Death.find({ isDeleted: false }).populate(this.populateCreators).populate(this.populatePatients);
    }

    async getUsersDeaths(query) {
        return await this.Death.find({ ...query, isDeleted: false })
            .populate(this.populateCreators)
            .populate(this.populatePatients);
    }

    async getDeathById(id) {
        return await this.Death.findById(id).populate(this.populateCreators).populate(this.populatePatients);
    }

    async updateDeath(id, updateData) {
        return await this.Death.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteDeath(id) {
        return await this.Death.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }

}

export default new DeathService();
