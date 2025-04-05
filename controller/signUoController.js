import userModel from "../models/userSchema.js";
import bcrypt from 'bcrypt';

export const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const existEmail = await userModel.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ name, email, password: encryptedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}