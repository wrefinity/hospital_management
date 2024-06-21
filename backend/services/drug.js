import Drug from "../models/drugs.js";
import logActivity from '../utils/logs.js';

class DrugService {
    constructor() {
        this.populateUser = { path: 'userId', select: '-password -activeRole -roles' };
    }

    async createDrug(userId, drugData) {
        const drug = await Drug.create({ ...drugData, userId });
        await logActivity('Drug Created', userId, `The Drug with name: ${drug.name} created`);
        return drug;
    }

    async getDrugs() {
        return await Drug.find({ isDeleted: false }).populate({ path: 'category' }).populate(this.populateUser);
    }

    async getDrugById(id) {
        return await Drug.findById(id).populate({ path: 'category' }).populate(this.populateUser);
    }

    async updateDrug(id, userId, updateData) {
        const drugUpdated = await Drug.findByIdAndUpdate(id, updateData, { new: true });
        if (drugUpdated) {
            await logActivity('Drug Updated', userId, `The Drug with name: ${drugUpdated.name} updated`);
        }
        return drugUpdated;
    }

    async incrementDrug(id, quantity) {
        const drug = await Drug.findById(id).populate({ path: 'category' }).populate(this.populateUser);
        if (drug) {
            drug.quantity += parseInt(quantity, 10);
            await drug.save();
        }
        return drug;
    }

    async decrementDrug(id, quantity) {
        const drug = await Drug.findById(id).populate({ path: 'category' }).populate(this.populateUser);
        if (drug) {
            drug.quantity -= parseInt(quantity, 10);
            await drug.save();
        }
        return drug;
    }

    async deleteDrug(id) {
        return await Drug.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }
}

export default new DrugService();
