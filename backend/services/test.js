import TestModel from "../models/test.js";
import Profile from "../models/profile.js";
import { populate } from "dotenv";

class TestService {

    constructor() {
        this.Test = TestModel;
        this.deSelectedFields = '-password -activeRole -roles'
        this.populateCreators = {
            path: 'createdBy',
            select: this.deSelectedFields
        };
        this.populatePatients = {
            path: 'patient',
            select: this.deSelectedFields,
            populate:{
                path:"profile"
            }
        }
    }
    // Create a new Test
    async createTest(testData) {
        const test = new this.Test(testData);
        const savedTest = await test.save();

        // Check if the user's profile exists
        const userProfile = await Profile.findById(testData.patient);

        if (userProfile) {
            // Update the user's profile with the new test ID
            await Profile.findByIdAndUpdate(
                testData.patient,
                { $push: { tests: savedTest?._id } },
                { new: true, useFindAndModify: false }
            );
        }
        return savedTest;
    }

    // get test
    async getTestById(id) {
        return await this.Test.findById(id).populate(this.populateCreators).populate(this.populatePatients);
    }
    // get all test
    async getTests() {
        return await this.Test.find({isDeleted: false}).populate(this.populateCreators).populate(this.populatePatients);
    }

    // get test either by patient or creator
    async getUsersTests(object) {
        return await this.Test.find({...object, isDeleted: false }).populate(this.populateCreators).populate(this.populatePatients);
    }

    async deleteTest(id) {
        return await this.Test.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    }

    async updateTest(id, body) {
        return await this.Test.findByIdAndUpdate(id, body, { new: true })
    }

}

export default new TestService()