import DeathService from '../services/death.js';
import { definedRole } from "../models/user.js";

class DeathRepo {

    async createDeath(req, res) {
        try {
            console.log(req.body)
            console.log(req.params, "paremeres")
            const patient = req.params?.patientId;
            const createdBy = req.user?._id;
            if (!patient) return res.status(400).json({ message: "kindly supply the patientId" })
            if (!createdBy) return res.status(403).json({ message: "kindly login" })
            const death = await DeathService.createDeath({...req.body, patient, createdBy});
            res.status(201).json({death, message:"death record created"});
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async getDeathById(req, res) {
        try {
            const id = req.params?.id;
            if (!id) return res.status(400).json({ message: "kindly supply the death record id" });
            const death = await DeathService.getDeathById(id);
            if (!death) {
                return res.status(404).json({ message: 'death record not found' });
            }
            res.status(200).json({death});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllDeaths(req, res) {
        try {
            const user = req.user;
            let deaths = null;
            if (!user) return res.status(400).json({ message: "kindly login" })

            if (user?.activeRole == definedRole[0]) {
                deaths = await DeathService.getUsersDeaths({ patient: user?._id });
            }else if(user?.activeRole == definedRole[definedRole.length - 1]){
                deaths = await DeathService.getDeaths();
            }else {
                deaths = await DeathService.getUsersDeaths({ createdBy: user?._id });
            }
            res.status(200).json({deaths});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateDeath(req, res) {
        try {
            const id = req.params?.id;
            const body = req.body;
            if (!body) return res.status(400).json({ message: "kindly supply the parameter to update" });
            if (!id) return res.status(400).json({ message: "kindly supply the death record id" });
            const death = await DeathService.updateDeath(id, body);
            if (!death) {
                return res.status(404).json({ message: 'death record not found' });
            }
            res.status(200).json({death, message:'death record updated'});
        } catch (error) {

            return res.status(500).json({ error: error.message });
        }
    }

    async deleteDeath(req, res) {
        try {
            const id = req.params?.id;
            if (!id) return res.status(400).json({ message: "kindly supply the death record id" });

            const death = await DeathService.deleteDeath(id);
            if (!death) {
                return res.status(404).json({ message: 'death record not found' });
            }
            res.status(200).json({death, message: 'death record deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

export default new DeathRepo();
