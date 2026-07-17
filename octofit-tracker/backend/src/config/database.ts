import mongoose from 'mongoose';

const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async (): Promise<void> => {
  await mongoose.connect(connectionString);
  console.log(`Connected to MongoDB at ${connectionString}`);
};

export const disconnectFromDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};

export default mongoose.connection;
