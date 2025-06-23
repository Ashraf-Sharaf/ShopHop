const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { orderItems, shippingAddress, notes } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Order items cannot be empty" });
    }

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
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/deliver", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "delivered";
    order.deliveredAt = new Date();

    await order.save();
    res.json({ message: "Order marked as delivered" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status !== "pending")
      return res
        .status(400)
        .json({ message: "Only pending orders can be cancelled" });

    order.status = "cancelled";
    order.cancelledAt = new Date();

    await order.save();
    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
