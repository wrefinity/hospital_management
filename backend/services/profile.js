import ProfileModel from "../models/profile.js";

class ProfileService {
  constructor() {
    this.Profile = ProfileModel;
  }

  // Create a new profile
  async createProfile(object) {
    return await this.Profile.create(object);
  }

 
  // Retrieve one user profile
  async getOneUserProfile(object) {
    return await this.Profile.findOne(object).populate({path:'userId', select:"-password"});
  }

  // Retrieve a user by ID
  async getUserProfileById(id) {
    return await this.Profile.findById(id).populate({path:'profile'}).select('-password');
  }

  // Update a user profile by ID
  async updateUserProfile(id, updatedObject) {
    return await this.Profile.findByIdAndUpdate(id, updatedObject, { new: true });
  }

  // Delete a user by ID
  async deleteUserProfile(id) {
    return await this.User.findByIdAndUpdate(id, {isDeleted:true}, { new: true });;
  }
}

export default new ProfileService();
