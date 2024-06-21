import UserService from "../services/users.js";


class UsersRepo {
    constructor() {
        this.userService = UserService;
      }

    // Get All Users Endpoint
    async getUsers(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json({ users, message:"users"});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get User by ID Endpoint
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ message: 'kindly provide the user id' })

            const user = await this.userService.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Update User Endpoint
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ message: 'kindly provide the user id' })

            const updatedUser = await this.userService.updateUser(id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(201).json({ user: updatedUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
 

    // Delete User Endpoint
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ message: 'kindly provide the user id' })

            const deletedUser = await this.userService.deleteUser(id);;
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({user:deletedUser, message: 'User deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new UsersRepo()