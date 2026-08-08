const mongoose = require("mongoose");

const withdrawalRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 1
    },

    otp: {
      type: String,
      required: true
    },

    otpExpiresAt: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Expired"],
      default: "Pending"
    },

    approvedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "WithdrawalRequest",
  withdrawalRequestSchema
);
