const Cart = require('../models/Cart');
const mongoose = require('mongoose');


exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.addOrUpdateItem = async (req, res) => {
  const { product, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(product))
    return res.status(400).json({ message: 'Invalid product ID' });

  if (quantity < 1) return res.status(400).json({ message: 'Quantity must be at least 1' });

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [{ product, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex((item) => item.product.equals(product));
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity; 
      } else {
        cart.items.push({ product, quantity });
      }
    }

    cart.updatedAt = Date.now();
    await cart.save();
    const populatedCart = await cart.populate('items.product');
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.removeItem = async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(400).json({ message: 'Invalid product ID' });

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((item) => !item.product.equals(productId));
    cart.updatedAt = Date.now();
    await cart.save();
    const populatedCart = await cart.populate('items.product');
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
