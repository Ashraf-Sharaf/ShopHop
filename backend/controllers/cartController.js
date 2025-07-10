const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate(
      "items.product"
    );
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addOrUpdateItem = async (req, res) => {
  const { product, quantity } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(product)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive integer" });
    }

    const productDoc = await Product.findById(product);
    if (!productDoc) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (productDoc.stock === 0) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    if (quantity > productDoc.stock) {
      return res
        .status(400)
        .json({ message: `Only ${productDoc.stock} units available` });
    }

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = new Cart({
        user: req.user.userId,
        items: [{ product, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex((item) =>
        item.product.equals(product)
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.push({ product, quantity });
      }
    }

    cart.updatedAt = Date.now();
    await cart.save();
    const populatedCart = await cart.populate("items.product");

    res.json(populatedCart);
  } catch (err) {
    console.error("Error in addOrUpdateItem:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeItem = async (req, res) => {
  const productId = req.params.id;

  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => !item.product.equals(productId));
    cart.updatedAt = Date.now();
    await cart.save();
    const populatedCart = await cart.populate("items.product");
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();

    const populatedCart = await cart.populate("items.product");
    res.json({ message: "Cart emptied successfully", cart: populatedCart });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
