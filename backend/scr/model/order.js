const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    status: { type: String, default: 'pending' },
    userId: { type: String },
    products: [
      {
        productId: { type: String },
        productName: { type: String },
        quantity: { type: Number },
      },
    ],
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
