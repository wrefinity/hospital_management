import CategoryModel from "../models/category.js";

class CategoryService {
  
  constructor() {
    this.Category = CategoryModel;
    this.deSelectedFields = '-password -activeRole -roles';
    this.populateUsers = {
        path: 'userId',
        select: this.deSelectedFields
    };
}

  // Create a new category
  async createCategory(object) {
    return await this.Category.create(object);
  }

  // Retrieve all categories
  async getAllCategories() {
    return await this.Category.find({isDeleted:false}).populate(this.populateUsers);
  }

  // Retrieve a category by ID
  async getCategoryById(id) {
    return await this.Category.findById(id).populate( this.populateUsers);
  }

  // Update a category by ID
  async updateCategory(id, updatedObject) {
    return await this.Category.findByIdAndUpdate(id, updatedObject, { new: true });
  }

  // Delete a category by ID
  async deleteCategory(id) {
    return await this.Category.findByIdAndUpdate(id, {isDeleted:true}, { new: true });;
  }
}

export default new CategoryService();
