import Drug from "../models/drugs.js"
import logActivity from '../utils/logs.js';


class DrugRepo {

    constructor() {
        this.populateUser = { path: 'userId', select: '-password -activeRole -roles' }
    }

    async createDrug(req, res) {
        try {
            const userId = req.user._id;
            if (!userId) return res.status(403).json({ message: 'Kindly login' })
            const drug = await Drug.create({ ...req.body, userId });
            await logActivity('Drug Created', userId, `The Drug with name : ${drug?.name} created`)
            return res.status(201).json({ drug, message: 'drug created' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getDrugs(_, res) {
        try {
            const drugs = await Drug.find({ isDeleted: false })
                .populate({ path: 'category' })
                .populate(this.populateUser);
            res.json({ drugs });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get Drug by ID Endpoint
    async getDrugById(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ message: 'kindly provide the drug id' })

            const drug = await Drug.findById(id).populate({ path: 'category' })
                .populate(this.populateUser);
            if (!drug) {
                return res.status(404).json({ message: 'Drug not found' });
            }
            res.json(drug);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // Update Drug Endpoint
    async updateDrugs(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user?._id;
            if (!id) return res.status(400).json({ message: 'kindly provide the drug id' })
            if (!userId) return res.status(403).json({ message: 'Kindly login' })
            const drugUpdated = await Drug.findByIdAndUpdate(id, req.body, { new: true });
            if (!drugUpdated) {
                return res.status(404).json({ message: 'Drug not found' });
            }
            await logActivity('Drug Updates', userId, `The Drug with name : ${drugUpdated?.name} updated`)

            return res.json({ drug: drugUpdated, message: 'drug updated' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // Increment Stock Endpoint
    async incrementDrug(req, res) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const userId = req.user?._id;

            if (!userId) return res.status(403).json({ message: 'Kindly login' })

            // Validate input
            if (quantity === undefined || quantity === null) {
                return res.status(400).json({ message: 'Kindly provide the drug quantity' });
            }
            if (!id) return res.status(400).json({ message: 'kindly provide the drug id' })

            const drug = await Drug.findById(id)
                .populate({ path: 'category' })
                .populate(this.populateUser);
            if (!drug) {
                return res.status(404).json({ message: 'drug not found' });
            }
            drug.quantity += parseInt(req.body.quantity);
            await drug.save();
            await logActivity('Stock Increment', userId, `The drug with name : ${drug?.name} stocked, quantity: ${quantity}`)

            return res.json({ drug, message: 'drug incremented' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Decrement Stock Endpoint
    async decrementDrug(req, res) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const userId = req.user?._id;
            if (!userId) return res.status(403).json({ message: 'Kindly login' })

            // Check if quantity and id are provided
            if (!quantity) {
                return res.status(400).json({ message: 'Kindly provide the drug quantity' });
            }
            if (!id) {
                return res.status(400).json({ message: 'Kindly provide the drug ID' });
            }

            const drug = await Drug.findById(id)
                .populate({ path: 'category' })
                .populate(this.populateUser);

            // Check if the drug exists
            if (!drug) {
                return res.status(404).json({ message: 'drug not found' });
            }

            // Ensure the resulting quantity does not become negative
            const newQuantity = drug.quantity - parseInt(quantity, 10);

            if (newQuantity < 0) {
                return res.status(400).json({ message: 'Insufficient stock. Cannot decrement below zero.' });
            }

            // Update the drug quantity and save it
            drug.quantity = newQuantity;
            await drug.save();
            await logActivity('Stock Decrement', userId, `The drug with name : ${drug?.name} decremented, quantity : ${newQuantity}`)


            return res.json({ drug, message: 'drug decremented' });
        } catch (error) {
            // Handle server errors
            res.status(500).json({ error: error.message });
        }
    }


    // Delete Drug Endpoint
    async deleteDrug(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user?._id;

            // Check if the ID is provided
            if (!id) {
                return res.status(400).json({ message: 'Kindly provide the drug ID' });
            }
            if (!userId) return res.status(403).json({ message: 'Kindly login' })

            // Properly await the operation to get the deleted drug
            const deletedDrug = await Drug.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

            // Check if the drug was found
            if (!deletedDrug) {
                return res.status(404).json({ message: 'drug not found' });
            }
            await logActivity('Drug Updates', userId, `The drug with name : ${deletedDrug?.name} update`)
            return res.json({ message: 'drug deleted', drug: deletedDrug });
        } catch (error) {
            // Handle server errors
            return res.status(500).json({ error: error.message });
        }
    }

}


export default new DrugRepo()