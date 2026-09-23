const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;

    console.log("✅ MongoDB Connected");
  } catch (err) {
    isConnected = false;
    console.error("❌ MongoDB Connection Failed:", err.message);
    throw err;
  }
};

module.exports = connectDB;