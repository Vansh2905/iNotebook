const mongoose = require('mongoose');
const mongo_url=process.env.MONGO_URL;
const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1); 
  }
};
module.exports = connectMongoDB;
