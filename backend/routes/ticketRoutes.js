const express = require("express");
const router = express.Router();

const {
createTicket,
myTickets
} = require("../controllers/ticketController");

const auth = require("../middleware/authMiddleware");


router.post("/", auth, createTicket);

router.get("/my", auth, myTickets);


module.exports = router;
