import mongoose from 'mongoose';
import { config } from './app.config';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process on failure
  }
};

export default connectDatabase;
