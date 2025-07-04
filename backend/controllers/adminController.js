const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.getSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalOrders = await Order.countDocuments();

    const productsStock = await Product.find({}, "name stock").lean();
    const outOfStock = await Product.countDocuments({ stock: 0 });

    const revenueData = await Order.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);
    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    const statusCounts = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const orderStatus = { pending: 0, delivered: 0, cancelled: 0 };
    statusCounts.forEach((item) => {
      orderStatus[item._id] = item.count;
    });

    const topSellingProducts = await Product.find({})
      .sort({ soldCount: -1 })
      .limit(5)
      .select("name")
      .lean();

    res.json({
      users: totalUsers,
      orders: totalOrders,
      productsStock,
      outOfStock,
      revenue: totalRevenue,
      orderStatus,
      topSellingProducts,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json({ message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "email name");
    res.json({ message: "All orders fetched successfully", orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};