require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", 
    role: "admin",
    isVerified: true,
    avatar: "/avatars/admin.png",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
    isVerified: true,
    avatar: "/avatars/john.png",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "user",
    isVerified: false,
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Bob Brown",
    email: "bob@example.com",
    password: "password123",
    role: "user",
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);


    await User.deleteMany();


    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }

    const created = await User.insertMany(users);
    console.log(`✅ Users seeded: ${created.length}`);

    process.exit();
  } catch (error) {
    console.error("❌ Seeding users failed:", error.message);
    process.exit(1);
  }
};

seedUsers();
