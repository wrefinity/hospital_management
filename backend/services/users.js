import UserModel from "../models/user.js";

class UserService {
  constructor() {
    this.User = UserModel;
  }

  // Create a new category
  async createUser(object) {
    return await this.User.create(object);
  }

  // Retrieve all users
  async getAllUsers() {
    return await this.User.find({isDeleted:false}).populate({path:'profile', populate:{path:'medicalHistory'} }).select('-password');
  }
  // Retrieve all users
  async getOneUser(object) {
    return await this.User.findOne(object).populate({path:'profile'});
  }

  // Retrieve a user by ID
  async getUserById(id) {
    return await this.User.findById(id).populate({path:'profile'}).select('-password');
  }

  // Update a user by ID
  async updateUser(id, updatedObject) {
    return await this.User.findByIdAndUpdate(id, updatedObject, { new: true });
  }

  // Delete a user by ID
  async deleteUser(id) {
    return await this.User.findByIdAndUpdate(id, {isDeleted:true}, { new: true });
  }
  // Delete a user by ID
  async deleteUserPurely(id) {
    return await this.User.findByIdAndDelete(id);
  }
}

export default new UserService();
