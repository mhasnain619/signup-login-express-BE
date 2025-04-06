import userModel from "../models/userSchema.js";

export const getAllUserController = async (req, res) => {
    try {
        const getData = await userModel.find();
        res.status(200).json({ message: 'Fetched all newUsers', getData });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}