const mongoose = require("mongoose");
const Product = require("../models/Product");

const products = [
  {
    name: "Organic Bananas",
    category: "Fruits",
    price: 2.5,
    image: "/images/banana.jpg",
    stock: 30,
    description: "Fresh organic bananas from local farms.",
    soldCount: 15,
  },
  {
    name: "Whole Wheat Bread",
    category: "Bakery",
    price: 3.2,
    image: "/images/bread.jpg",
    stock: 20,
    description: "Soft and healthy whole wheat bread.",
    soldCount: 10,
  },
  {
    name: "Cheddar Cheese",
    category: "Dairy",
    price: 5.5,
    image: "/images/cheddar.jpg",
    stock: 12,
    description: "Sharp cheddar cheese block.",
    soldCount: 25,
  },
  {
    name: "Tomato Ketchup",
    category: "Pantry",
    price: 1.8,
    image: "/images/ketchup.jpg",
    stock: 50,
    description: "Classic tomato ketchup in squeeze bottle.",
    soldCount: 40,
  },
  {
    name: "Olive Oil",
    category: "Pantry",
    price: 6.75,
    image: "/images/oliveoil.jpg",
    stock: 25,
    description: "Extra virgin olive oil - 500ml.",
    soldCount: 18,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    const created = await Product.insertMany(products);
    console.log("✅ Products seeded:", created.length);
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
