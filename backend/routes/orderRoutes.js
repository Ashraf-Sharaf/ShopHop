const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");

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
  async (req, res) => {
    try {
      const { orderItems, shippingAddress, notes } = req.body;
      const totalPrice = orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const order = new Order({
        user: req.user.userId,
        orderItems,
        shippingAddress,
        totalPrice,
        notes,
      });

      const createdOrder = await order.save();
      res
        .status(201)
        .json({ message: "Order placed successfully", order: createdOrder });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create order", error: error.message });
    }
  }
);

router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "email");
    res.json({ message: "All orders fetched successfully", orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
});

router.get(
  "/:id",
  authMiddleware,
  [param("id").isMongoId().withMessage("Invalid order ID")],
  validateMiddleware,
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
      );

      if (!order) return res.status(404).json({ message: "Order not found" });

      const isOwner = order.user._id.toString() === req.user.userId;
      const isAdmin = req.user.role === "admin";

      if (!isOwner && !isAdmin) {
        return res
          .status(403)
          .json({ message: "Access denied: not your order" });
      }

      res.json({ message: "Order fetched successfully", order });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch order", error: error.message });
    }
  }
);

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json({ message: "Your orders fetched successfully", orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch your orders", error: error.message });
  }
});

router.put(
  "/:id/deliver",
  authMiddleware,
  [param("id").isMongoId().withMessage("Invalid order ID")],
  validateMiddleware,
  async (req, res) => {
    try {
      const order = await Order.findOne({
        _id: req.params.id,
        user: req.user.userId,
      });

      if (!order) return res.status(404).json({ message: "Order not found" });

      order.status = "delivered";
      order.deliveredAt = new Date();

      await order.save();
      res.json({ message: "Order marked as delivered successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Failed to mark order as delivered",
        error: error.message,
      });
    }
  }
);

router.put(
  "/:id/cancel",
  authMiddleware,
  [param("id").isMongoId().withMessage("Invalid order ID")],
  validateMiddleware,
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      const isOwner = order.user.toString() === req.user.userId;
      const isAdmin = req.user.role === "admin";

      if (!isOwner && !isAdmin) {
        return res
          .status(403)
          .json({ message: "Access denied: not your order" });
      }

      if (order.status !== "pending") {
        return res
          .status(400)
          .json({ message: "Only pending orders can be cancelled" });
      }

      order.status = "cancelled";
      order.cancelledAt = new Date();

      await order.save();

      res.json({ message: `Order cancelled successfully`, order });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to cancel order", error: error.message });
    }
  }
);

module.exports = router;
