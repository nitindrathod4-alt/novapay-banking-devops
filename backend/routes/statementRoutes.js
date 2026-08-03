const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  downloadStatement,
} = require("../controllers/statementController");

router.get("/download", auth, downloadStatement);

module.exports = router;
