const dns = require('dns');
// Ensure Node resolves MongoDB Atlas SRV records reliably on Windows environments
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment configuration.');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`[FitTrack DB] MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[FitTrack DB Error] Failed to connect to MongoDB Atlas: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
