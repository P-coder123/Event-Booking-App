
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI: string | undefined = process.env.MONGO_URI;

/**
 * Connects to MongoDB using the MONGO_URI environment variable.
 * If MONGO_URI is not set the function will warn and return without exiting the process.
 */
const connectDB = async (): Promise<void> => {
	if (!mongoURI) {
		console.warn('MONGO_URI is not defined in the environment; skipping MongoDB connection.');
		return;
	}

	try {
		await mongoose.connect(mongoURI);
		console.log('MongoDB connected successfully');
	} catch (error: any) {
		console.error('Failed to connect to MongoDB:', error?.message ?? error);
		// don't exit here; let the app decide how to handle DB failures in production
	}
};

export default connectDB;
