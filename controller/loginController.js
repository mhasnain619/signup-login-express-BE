import userModel from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const existEmail = await userModel.findOne({ email });
        if (!existEmail) { // FIXED: Check if user does not exist
            return res.status(400).json({ message: 'Invalid email & password' });
        }

        const comparePassword = await bcrypt.compare(password, existEmail.password);
        if (!comparePassword) { // FIXED: Proper check for password mismatch
            return res.status(400).json({ message: 'Invalid email & password' });
        }
        var token = jwt.sign({ email: existEmail.email }, process.env.JWT_SECRET_KEY)
        console.log(token);

        res.status(200).json({ message: 'Login successfully', token });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}