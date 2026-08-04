const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getPendingKyc,
  approveKyc,
  rejectKyc
} = require("../controllers/adminKycController");


// Admin KYC APIs

router.get(
  "/kyc",
  auth,
  admin,
  getPendingKyc
);


router.put(
  "/kyc/:id/approve",
  auth,
  admin,
  approveKyc
);


router.put(
  "/kyc/:id/reject",
  auth,
  admin,
  rejectKyc
);


module.exports = router;
