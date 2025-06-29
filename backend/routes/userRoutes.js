const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");

const userController = require("../controllers/userController");

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateMiddleware,
  userController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateMiddleware,
  userController.login
);

router.get("/profile", authMiddleware, userController.getProfile);

router.put(
  "/profile",
  authMiddleware,
  [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("email").optional().isEmail().withMessage("Valid email is required"),
    body("avatar").optional().isString().withMessage("Avatar must be a string"),
  ],
  validateMiddleware,
  userController.updateProfile
);



module.exports = router;
