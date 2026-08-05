const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword,
  refreshToken,
  logout,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);

router.put("/reset-password", resetPassword);

router.post("/refresh-token", refreshToken);

router.post("/logout", logout);

module.exports = router;
