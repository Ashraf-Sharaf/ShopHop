const express = require("express");
const { body, param } = require("express-validator");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const cartController = require("../controllers/cartController");

router.get("/", authMiddleware, cartController.getCart);

router.post(
  "/item",
  authMiddleware,
  [
    body("product")
      .notEmpty()
      .withMessage("Product ID is required")
      .isMongoId()
      .withMessage("Invalid product ID"),
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  validateMiddleware,
  cartController.addOrUpdateItem
);

router.delete(
  "/item/:id",
  authMiddleware,
  [param("id").isMongoId().withMessage("Invalid product ID")],
  validateMiddleware,
  cartController.removeItem
);

router.delete("/empty", authMiddleware, cartController.emptyCart);

module.exports = router;
