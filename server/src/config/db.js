// utils/db.js

import { connect } from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the process with failure
  }
};
