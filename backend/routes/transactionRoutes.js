const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  balance,
  deposit,
  withdraw,
  transfer,
  history,
} = require("../controllers/transactionController");

router.get("/balance", auth, balance);
router.post("/deposit", auth, deposit);
router.post("/withdraw", auth, withdraw);
router.post("/transfer", auth, transfer);
router.get("/history", auth, history);

module.exports = router;
