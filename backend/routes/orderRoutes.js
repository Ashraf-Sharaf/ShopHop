const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");

const orderController = require("../controllers/orderController");

router.post(
  "/",
  authMiddleware,
  [
    body("orderItems")
      .isArray({ min: 1 })
      .withMessage("Order items must be a non-empty array"),
    body("orderItems.*.product")
      .notEmpty()
      .withMessage("Each order item must have a product ID"),
    body("orderItems.*.name")
      .notEmpty()
      .withMessage("Each order item must have a name"),
    body("orderItems.*.price")
      .isFloat({ gt: 0 })
      .withMessage("Each order item must have a valid price"),
    body("orderItems.*.quantity")
      .isInt({ gt: 0 })
      .withMessage("Each order item must have a quantity greater than zero"),
    body("shippingAddress")
      .notEmpty()
      .withMessage("Shipping address is required"),
  ],
  validateMiddleware,
  orderController.createOrder
);

router.get(
  "/:id",
  authMiddleware,
  [param("id").isMongoId().withMessage("Invalid order ID")],
  validateMiddleware,
  orderController.getOrder
);

router.get("/my", authMiddleware, orderController.getUserOrders);

router.put(
  "/:id/deliver",
  authMiddleware,
  [param("id").isMongoId().withMessage("Invalid order ID")],
  validateMiddleware,
  orderController.setDelivered
);

router.put(
  "/:id/cancel",
  authMiddleware,
  [param("id").isMongoId().withMessage("Invalid order ID")],
  validateMiddleware,
  orderController.cancelOrder
);

module.exports = router;
