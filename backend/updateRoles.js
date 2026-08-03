require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function updateRoles() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.updateOne(
      { username: "admin" },
      { $set: { role: "admin", balance: 1000000 } }
    );

    await User.updateOne(
      { username: "nitin" },
      { $set: { role: "user" } }
    );

    await User.updateOne(
      { username: "rahul" },
      { $set: { role: "user" } }
    );

    console.log("✅ Roles updated successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateRoles();
