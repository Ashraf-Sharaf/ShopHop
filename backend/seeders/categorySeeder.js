require('dotenv').config();

const mongoose = require("mongoose");
const Category = require("../models/Category"); 

const categories = [
  {
    name: "Fresh Produce",
    description: "Fruits, vegetables, herbs",
    icon: "LocalGroceryStoreIcon",
    backgroundColor: "rgba(76, 175, 80, 0.15)",
    iconColor: "#4caf50",
    cardColor: "#4caf50",
  },
  {
    name: "Dairy & Eggs",
    description: "Milk, cheese, yogurt, eggs",
    icon: "BreakfastDiningIcon",
    backgroundColor: "rgba(255, 245, 157, 0.3)",
    iconColor: "#fdd835",
    cardColor: "#fdd835",
  },
  {
    name: "Snacks & Beverages",
    description: "Chips, biscuits, water, juices",
    icon: "FastfoodIcon",
    backgroundColor: "rgba(255, 152, 0, 0.15)",
    iconColor: "#ff9800",
    cardColor: "#ff9800",
  },
  {
    name: "Pantry Staples",
    description: "Rice, pasta, oil, spices",
    icon: "KitchenIcon",
    backgroundColor: "rgba(141, 110, 99, 0.15)",
    iconColor: "#8d6e63",
    cardColor: "#8d6e63",
  },
  {
    name: "Household Essentials",
    description: "Cleaning supplies, detergents",
    icon: "CleaningServicesIcon",
    backgroundColor: "rgba(33, 150, 243, 0.15)",
    iconColor: "#2196f3",
    cardColor: "#2196f3",
  },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);


    await Category.deleteMany();


    const created = await Category.insertMany(categories);
    console.log(`✅ Categories seeded: ${created.length}`);

    process.exit();
  } catch (error) {
    console.error("❌ Seeding categories failed:", error.message);
    process.exit(1);
  }
};

seedCategories();
