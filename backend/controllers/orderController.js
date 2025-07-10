const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, notes } = req.body;

    const cart = await Cart.findOne({ user: req.user.userId }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const orderItems = [];
    let totalPrice = 0;

    for (const item of cart.items) {
      const product = item.product;

      if (!product) {
        return res
          .status(400)
          .json({ message: "One of the products no longer exists" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Product ${product.name} does not have enough stock`,
        });
      }

      product.stock -= item.quantity;
      await product.save();

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      totalPrice += product.price * item.quantity;
    }

    const order = new Order({
      user: req.user.userId,
      orderItems,
      shippingAddress,
      totalPrice,
      notes,
    });

    const createdOrder = await order.save();

    cart.items = [];
    cart.updatedAt = new Date();
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: createdOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    const isOwner = order.user._id.toString() === req.user.userId;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Access denied: not your order" });
    }

    res.json({ message: "Order fetched successfully", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch order", error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
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
};

exports.setDelivered = async (req, res) => {
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
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const isOwner = order.user.toString() === req.user.userId;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Access denied: not your order" });
    }

    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be cancelled" });
    }

    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
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
};
