import CategoryService from '../services/categories.js';
import logActivity from '../utils/logs.js';

class CategoryRepo {

    // create categoriees Endpoint
    async createCategories(req, res) {
        try {
            const userId = req.user._id;
            if (!userId) return res.status(403).json({ message: 'Kindly login' })

            const { desc, name } = req.body;
            if (!desc || !name) return res.status(400).json({ message: "both the category name and description required" });
            const categories = await CategoryService.createCategory({ desc, name, userId });
            if (!categories) return res.status(500).json({ message: "category creation failed" });
            await logActivity('Category Created', userId, `category with the name: ${categories?.name} created` )
            return res.status(200).json({ categories, message: "category created" });
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: error.message });
        }
    }
    // Get All Categories Endpoint
    async getCategories(req, res) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.status(200).json({ categories });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get Category by ID Endpoint
    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ message: 'Please provide the category ID' });

            const category = await CategoryService.getCategoryById(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({ category });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Update Category Endpoint
    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user._id;
            if (!userId) return res.status(403).json({ message: 'Kindly login' })

            if (!id) return res.status(400).json({ message: 'Please provide the category ID' });

            const updatedCategory = await CategoryService.updateCategory(id, req.body);
            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }
            await logActivity('Category Updated', userId, `category with the name: ${updatedCategory?.name} updated` )

            return res.status(200).json({ category: updatedCategory });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Delete Category Endpoint
    async deleteCategory(req, res) {
        try {
            const userId = req.user._id;
            if (!userId) return res.status(403).json({ message: 'Kindly login' })

            const { id } = req.params;
            if (!id) return res.status(400).json({ message: 'Please provide the category ID' });
            const deletedCategory = await CategoryService.deleteCategory(id);
            if (!deletedCategory) return res.status(500).json({ message: 'Category not found'});
            await logActivity('Category Deleted', userId, `category with the name: ${deletedCategory?.name} deleted` )

            return res.status(200).json({ message: 'Category deleted', category:deletedCategory });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new CategoryRepo();