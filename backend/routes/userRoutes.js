const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getUsers,
  deleteUser,
  depositUser,
  withdrawUser,
  analytics,
  uploadPhoto,
  toggleUserStatus,
  updateUser,
} = require("../controllers/userController");

// ================= USERS =================

router.get("/", getUsers);

// ================= ANALYTICS =================

router.get("/analytics", analytics);

// ================= DEPOSIT =================

router.post("/:id/deposit", depositUser);

// ================= WITHDRAW =================

router.post("/:id/withdraw", withdrawUser);

// ================= UPDATE USER =================

router.put("/users/:id", updateUser);

// ================= BLOCK / UNBLOCK USER =================
router.patch("/users/:id/status", toggleUserStatus);

// ================= PROFILE PHOTO =================

router.post(
  "/:id/photo",
  upload.single("photo"),
  uploadPhoto
);

// ================= DELETE USER =================

router.delete("/:id", deleteUser);

module.exports = router;
