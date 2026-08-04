const express = require("express");
const router = express.Router();

const {
allTickets,
updateTicket
} = require("../controllers/adminTicketController");

const auth = require("../middleware/authMiddleware");


router.get("/", auth, allTickets);

router.put("/:id", auth, updateTicket);


module.exports = router;
