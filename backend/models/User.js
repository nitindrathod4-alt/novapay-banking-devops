const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    balance: {
      type: Number,
      default: 10000,
    },

    accountNumber: {
      type: String,
      unique: true,
      default: () =>
        Math.floor(
          100000000000 + Math.random() * 900000000000
        ).toString(),
    },

    ifsc: {
      type: String,
      default: "NOVA0001234",
    },

    status: {
      type: String,
      enum: ["Active", "Blocked"],
      default: "Active",
    },

    photo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
