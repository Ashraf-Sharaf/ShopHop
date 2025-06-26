const Product = require("../models/Product");

exports.getAllProdcuts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addProduct = async (req, res) => {
  const { name, category, price, image, stock, description, soldCount } =
    req.body;

  try {
    const existingProduct = await Product.findOne({ name: name.trim() });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists" });
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
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid product data", error: error.message });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product edited successfully", updatedProduct });
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
