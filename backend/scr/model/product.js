const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    image: { type: String, require: true },
    name: { type: String, require: true },
    title: { type: String, require: true, unique: true },
    desc: { type: String },
    size: { type: Number },
    price: { type: Number, require: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model('products', productSchema);
