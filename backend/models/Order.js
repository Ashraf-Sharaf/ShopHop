const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true }
})

const shippingAddressSchema = new mongoose.Schema({
  fullName: { type: String },
  city: { type: String },
  street: { type: String },
  phone: { type: String }
}, { _id: false })

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [orderItemSchema],
  shippingAddress: shippingAddressSchema,
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: { type: String, default: 'COD' },
  notes: { type: String },
  deliveredAt: { type: Date },
  cancelledAt: { type: Date }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
