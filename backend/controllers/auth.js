import User from "../models/user.js"
import Profile from "../models/profile.js"
import JwtAuth from "../middlewares/jswt.js"
import logActivity from "../utils/logs.js"
import userService from "../services/users.js"
import profileService from "../services/profile.js"

class AuthRepo extends JwtAuth {

    constructor() {
        super();
        this.userService = userService;
        this.profileService = profileService;
    }

    async register(req, res) {
        try {
            let { email, username, password: pass } = req.body;
            //ensure the essentials fields are supplied
            if (!email || !username) return res.status(400).json({ message: 'email, username, and password field are required' })
            if (!pass) pass = username;
            const userExist = await this.userService.getOneUser({ $or: [{ email }, { username }] });

            if (userExist) return res.status(400).json({ message: "User already exist" });

            const newUser = await this.userService.createUser({ email, username, password: pass });
            if (!newUser) return res.status(500).json({ message: "Oop user not created, something went wrong" })
            const newProfile = await this.profileService.createProfile({ ...req.body, userId: newUser._id });
            if (!newProfile) {
                // Rollback user creation if profile creation fails
                await this.userService.deleteUserPurely(newUser._id);
                return res.status(500).json({ message: "Oops, profile not created, something went wrong" });
            }
            // Update the user with the newly created profile
            await this.userService.updateUser(newUser._id, { profile: newProfile._id });

            const { password, ...user } = newUser._doc;
            await logActivity('Account Creation', user._id, 'created an account')
            return res.status(201).json({ message: "User created", user })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: `Error: ${error.message}` })
        }
    }

    async login(req, res) {
        const { password: pass, email } = req.body;
        if (!pass || !email)
            return res.status(400).json({ message: 'Both email and password fields are required' });

        try {
            const user = await User.findOne({ email }).populate({path:'profile', populate:{path:'medicalHistory'}});
            if (!user) return res.status(400).json({ message: 'User does not exist' });

            const isPasswordValid = user.comparePassword(pass);
            if (isPasswordValid === false)
                return res.status(401).json({ message: 'Invalid credentials' });

            user.activeRole = user.roles[0];
            await user.save();

            const accessToken = this.createJWT({ _id: user._id.toString() });
            if (!accessToken) throw new Error("Access token not generated");

            // const userDetails = await User.findOne({ email }).populate({path:'profile', populate:{path:'medicalHistory'}});
            const { password, ...others } = user._doc;

            return res.status(201).json({ user: { ...others, token: accessToken }, message: 'Login Success' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    async resetPassword(req, res) {
        const { password: pass, newPassword } = req.body
        if (!pass || !newPassword) return res.status(400).json({ message: 'kindly supply the new password and old password' })
        const userId = req.user._id;
        if (!userId) return res.status(400).json({ message: 'kindly login for this reset password method' })
        try {
            const user = await User.findById(userId)
            if (!user) return res.status(400).json({ message: 'user does not exit' })

            if (!user.comparePassword(pass))
                return res.status(401).json({ message: 'the old password is wrong' })
            user.password = newPassword;
            // Save the updated user
            await user.save();
            return res.status(200).json({ message: 'password update success' });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    async updateProfile(req, res) {
        try {
            // Check if the user is authenticated
            const userId = req.user?._id;
            if (!userId) return res.status(400).json({ message: 'Please log in to update your profile' });

            // Check if the user exists
            const user = await this.userService.getUserById(userId);
            if (!user) return res.status(404).json({ message: 'User does not exist' });

            // Check if a profile exists for the user
            let profile = await Profile.findOne({ userId: userId });

            if (!profile) {
                // Create a new profile if it doesn't exist
                profile = await Profile.create({ ...req.body, userId: userId });
                if (!profile) {
                    return res.status(500).json({ message: 'Something went wrong while creating the profile' });
                }

                // Link the new profile to the user
                user.profile = profile._id;
                await user.save();

                // Re-fetch the user to ensure the populate works
                const updatedUser = await this.userService.getUserById(userId);

                // Return the created profile with a 201 status and the updated user
                const accessToken = await this.createJWT({ _id: user._id });
                const { password, ...others } = updatedUser._doc;
                return res.status(201).json({ message: 'Profile created successfully', user: { ...others, token: accessToken } });
            }

            // If a profile exists, update it with new data
            const updatedProfile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true });
            if (!updatedProfile) {
                return res.status(404).json({ message: 'Failed to update the profile' });
            }
            // Re-fetch the user to ensure the populate works
            const updatedUser = await this.userService.getUserById(userId);

            // Return the updated profile with a 200 status
            const accessToken = await this.createJWT({ _id: updatedUser._id });
            const { password, ...others } = updatedUser._doc; // If necessary, include others and access token
            return res.status(200).json({ message: 'Profile updated successfully', user: { ...others, token: accessToken } });

        } catch (error) {
            // Handle unexpected errors
            console.error('Error updating profile:', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }


}

export default new AuthRepo()