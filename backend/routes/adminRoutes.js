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

module.exports = router;
