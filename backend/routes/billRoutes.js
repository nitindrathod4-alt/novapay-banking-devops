const express = require("express");
const router = express.Router();

const { billPayment } = require("../controllers/billController");
const auth = require("../middleware/authMiddleware");


router.post("/payment", auth, billPayment);


module.exports = router;
