const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
    body("image").optional().isString(),
    body("description").optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, price, image, stock, description, soldCount } = req.body;

    try {
      const existingProduct = await Product.findOne({ name: name.trim() });
      if (existingProduct) {
        return res.status(400).json({ message: "Product with this name already exists" });
      }

      const product = new Product({
        name,
        category,
        price,
        image,
        stock,
        description,
        soldCount,
      });

      const savedProduct = await product.save();
      res.status(201).json({ message: "Product created successfully", product: savedProduct });
    } catch (error) {
      res.status(400).json({ message: "Invalid product data", error: error.message });
    }
  }
);


router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  [
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct)
        return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product edited successfully", updatedProduct });
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error: error.message });
    }
  }
);


router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
