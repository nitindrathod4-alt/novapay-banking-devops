const express = require("express");
const router = express.Router();
const { publicDeposit } = require("../controllers/publicController");

router.post("/deposit", publicDeposit);

module.exports = router;
