const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {

    const {
      type,
      from,
      to,
      travelDate,
      passengerName
    } = req.body;

    if (!type || !from || !to || !travelDate || !passengerName) {
      return res.status(400).json({
        success: false,
        message: "Please fill all booking details"
      });
    }

    const bookingId =
      "NP" +
      Date.now().toString().slice(-8) +
      Math.floor(100 + Math.random() * 900);

    const booking = await Booking.create({
      user: req.user.id,
      bookingId,
      type,
      from,
      to,
      travelDate,
      passengerName,
      status: "Confirmed"
    });

    res.status(201).json({
      success: true,
      message: "Booking Confirmed Successfully",
      booking
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};


exports.myBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user.id
    }).sort({
      createdAt: -1
    });

    res.json({
      success: true,
      bookings
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};
