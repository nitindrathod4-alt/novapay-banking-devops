const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    bookingId: {
      type: String,
      unique: true,
      required: true
    },

    type: {
      type: String,
      enum: ["Train", "Bus", "Flight", "Hotel"],
      required: true
    },

    from: {
      type: String,
      required: true
    },

    to: {
      type: String,
      required: true
    },

    travelDate: {
      type: Date,
      required: true
    },

    passengerName: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
