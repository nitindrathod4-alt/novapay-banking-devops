const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  profile,
  uploadDocuments,
  updateKyc,
  getKycStatus
} = require("../controllers/profileController");

router.get("/", auth, profile);

router.post("/kyc", auth, updateKyc);

router.get("/kyc-status", auth, getKycStatus);

router.post("/upload", auth, upload.fields([{ name: "aadhaarDocument", maxCount: 1 }, { name: "panDocument", maxCount: 1 }]), uploadDocuments);

module.exports = router;
