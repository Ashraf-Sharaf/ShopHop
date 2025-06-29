require('dotenv').config();
const mongoose = require("mongoose");
const Order = require("../models/Order");

const seedOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);


    await Order.deleteMany();

    
    const userIds = [
      "685d977b3383692bd5329462",
      "685d977b3383692bd5329463",
    ];
    const productIds = [
      "685d97a01cbc4c45b5504852",
      "685d97a01cbc4c45b5504853",
      "685d97a01cbc4c45b5504854",
    ];

    const orders = [
      {
        user: userIds[0],
        orderItems: [
          { product: productIds[0], quantity: 2, price: 25 },
          { product: productIds[1], quantity: 1, price: 40 },
        ],
        shippingAddress: {
          fullName: "John Doe",
          city: "Beirut",
          street: "123 Main St",
          phone: "+9617000000",
        },
        totalPrice: 90, 
        status: "pending",
        paymentMethod: "COD",
      },
      {
        user: userIds[1],
        orderItems: [
          { product: productIds[2], quantity: 3, price: 15 },
        ],
        shippingAddress: {
          fullName: "Jane Smith",
          city: "Tripoli",
          street: "456 Elm St",
          phone: "+9617000001",
        },
        totalPrice: 45, 
        status: "delivered",
        deliveredAt: new Date(),
        paymentMethod: "COD",
      },
      {
        user: userIds[0],
        orderItems: [
          { product: productIds[1], quantity: 2, price: 40 },
        ],
        shippingAddress: {
          fullName: "John Doe",
          city: "Beirut",
          street: "123 Main St",
          phone: "+9617000000",
        },
        totalPrice: 80,
        status: "cancelled",
        cancelledAt: new Date(),
        paymentMethod: "COD",
      },
      {
        user: userIds[1],
        orderItems: [
          { product: productIds[0], quantity: 1, price: 25 },
          { product: productIds[2], quantity: 4, price: 15 },
        ],
        shippingAddress: {
          fullName: "Jane Smith",
          city: "Tripoli",
          street: "456 Elm St",
          phone: "+9617000001",
        },
        totalPrice: 85,
        status: "pending",
        paymentMethod: "COD",
      },
      {
        user: userIds[0],
        orderItems: [
          { product: productIds[2], quantity: 5, price: 15 },
        ],
        shippingAddress: {
          fullName: "John Doe",
          city: "Beirut",
          street: "123 Main St",
          phone: "+9617000000",
        },
        totalPrice: 75,
        status: "pending",
        paymentMethod: "COD",
      },
    ];

    const createdOrders = await Order.insertMany(orders);
    console.log(`✅ Orders seeded: ${createdOrders.length}`);

    process.exit();
  } catch (error) {
    console.error("❌ Seeding orders failed:", error.message);
    process.exit(1);
  }
};

seedOrders();
