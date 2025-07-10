const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");

const orderController = require("../controllers/orderController");

router.post(
  "/add",
  authMiddleware,
  [
    body("shippingAddress")
      .notEmpty()
      .withMessage("Shipping address is required"),
  ],
  validateMiddleware,
  orderController.createOrder
);


router.get(
  "/single/:id",
  authMiddleware,
  [param("id").isMongoId().withMessage("Invalid order ID")],
  validateMiddleware,
  orderController.getOrder
);

router.get("/my", authMiddleware, orderController.getUserOrders);

router.put(
  "/single/:id/deliver",
  authMiddleware,
  [param("id").isMongoId().withMessage("Invalid order ID")],
  validateMiddleware,
  orderController.setDelivered
);

router.put(
  "/single/:id/cancel",
  authMiddleware,
  [param("id").isMongoId().withMessage("Invalid order ID")],
  validateMiddleware,
  orderController.cancelOrder
);

module.exports = router;
