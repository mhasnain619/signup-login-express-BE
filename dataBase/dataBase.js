import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        // Database Connection
        const mongoUri = process.env.MONGO_URI;

        mongoose.connect(mongoUri);

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

    } catch (error) {
        console.log(error);

    }
}