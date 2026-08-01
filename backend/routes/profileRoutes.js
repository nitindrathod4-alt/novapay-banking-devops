const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { profile } = require("../controllers/profileController");

router.get("/", auth, profile);

module.exports = router;
