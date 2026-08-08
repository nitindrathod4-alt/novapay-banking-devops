const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createWithdrawalRequest,
  approveWithdrawal
} = require("../controllers/withdrawalController");

router.post("/:id/request", auth, createWithdrawalRequest);

router.post("/:requestId/approve", auth, approveWithdrawal);

module.exports = router;
