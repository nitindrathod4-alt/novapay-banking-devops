const express = require("express");
const router = express.Router();

const {
  allTickets,
  updateTicket,
} = require("../controllers/adminTicketController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ADMIN ONLY
router.get("/", auth, admin, allTickets);

router.put("/:id", auth, admin, updateTicket);

module.exports = router;
