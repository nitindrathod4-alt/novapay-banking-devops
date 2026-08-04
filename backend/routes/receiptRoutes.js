const express = require("express");
const router = express.Router();

const { downloadReceipt } = require("../controllers/receiptController");
const auth = require("../middleware/authMiddleware");


router.get("/:id", auth, downloadReceipt);


module.exports = router;
