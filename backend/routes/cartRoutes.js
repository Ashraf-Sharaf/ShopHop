const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const cartController = require("../controllers/cartController");

router.get("/", authMiddleware, cartController.getCart);

router.post(
  "/item",
  authMiddleware,
  (req, res, next) => {
    const { product, quantity } = req.body;

    if (!product || !mongoose.Types.ObjectId.isValid(product)) {
      return res.status(400).json({ message: "Invalid or missing product ID" });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    next();
  },
  cartController.addOrUpdateItem
);

router.delete(
  "/item/:id",
  authMiddleware,
  (req, res, next) => {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    next();
  },
  cartController.removeItem
);

module.exports = router;
