const express = require("express");
const router = express.Router();

const { mobileRecharge } = require("../controllers/rechargeController");
const auth = require("../middleware/authMiddleware");


router.post("/mobile", auth, mobileRecharge);


module.exports = router;
