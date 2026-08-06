const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getUsers,
  createUser,
  deleteUser,
  depositUser,
  withdrawUser,
  analytics,
  uploadPhoto,
  toggleUserStatus,
  updateUser,
  getUserProfile,
  resetPassword,
  changePassword,
  getNotificationSettings,
  updateNotificationSettings,
} = require("../controllers/userController");

// ================= USERS =================

router.get("/", getUsers);
router.post("/", createUser);

// ================= ANALYTICS =================

router.get("/analytics", analytics);

// ================= RESET PASSWORD =================

router.put("/:id/password", resetPassword);


// ================= CHANGE PASSWORD =================

router.put("/change-password", require("../middleware/authMiddleware"), changePassword);


// ================= NOTIFICATION SETTINGS =================

router.get(
"/notification-settings",
require("../middleware/authMiddleware"),
getNotificationSettings
);


router.put(
"/notification-settings",
require("../middleware/authMiddleware"),
updateNotificationSettings
);

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

// ================= USER PROFILE =================

router.get("/:id", getUserProfile);

// ================= DELETE USER =================

router.delete("/:id", deleteUser);

module.exports = router;
