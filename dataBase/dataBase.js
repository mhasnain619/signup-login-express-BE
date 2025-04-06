import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error("MONGO_URI not found in environment variables");
        }

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true, // Required for MongoDB Atlas
        });

        console.log('MongoDB connected successfully');

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Optional: Exit process if DB fails to connect
    }
}
