const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  balance,
  filterTransactions,
  deposit,
  withdraw,
  transfer,
  history,
  allTransactions,
  exportTransactions,
  findUserByMobile,
  mySpending,
} = require("../controllers/transactionController");

// ================= USER =================

router.get("/balance", auth, balance);
router.post("/deposit", auth, deposit);
router.post("/withdraw", auth, withdraw);
router.post("/transfer", auth, transfer);
router.get("/user/mobile/:mobileNumber", auth, findUserByMobile);
router.get("/history", auth, history);
router.get("/my-spending", auth, mySpending);

// ================= ADMIN =================

router.get("/all", auth, allTransactions);
router.get("/filter", auth, filterTransactions);
router.get("/export", auth, exportTransactions);

module.exports = router;
