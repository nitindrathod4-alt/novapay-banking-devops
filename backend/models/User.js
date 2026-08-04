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
      enum: ["Active", "Frozen", "Closed"],
      default: "Active",
    },

    branchName: {
      type: String,
      default: "Pune Main Branch",
    },

    accountType: {
      type: String,
      enum: ["Savings", "Current"],
      default: "Savings",
    },

    accountOpenDate: {
      type: Date,
      default: Date.now,
    },

    mobileNumber: {
      type: String,
      unique: true,
      default: "",
    },

    aadhaarNumber: {
      type: String,
      default: "",
    },

    panNumber: {
      type: String,
      default: "",
    },

    kycStatus: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending",
    },

    aadhaarDocument: {
      type: String,
      default: "",
    },

    panDocument: {
      type: String,
      default: "",
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
