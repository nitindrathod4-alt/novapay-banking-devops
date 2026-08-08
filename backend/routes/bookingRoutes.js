const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createBooking,
  myBookings
} = require("../controllers/bookingController");

router.post("/", auth, createBooking);

router.get("/my", auth, myBookings);

module.exports = router;
