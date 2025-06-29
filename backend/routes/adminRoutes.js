const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const adminController = require("../controllers/adminController");

router.get(
  "/summary",
  authMiddleware,
  adminMiddleware,
  adminController.getSummary
);

router.get("/all_users", authMiddleware, adminMiddleware, adminController.getAllUsers);

router.get("/all_orders", authMiddleware, adminMiddleware, adminController.getAllOrders);

module.exports = router;
