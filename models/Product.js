const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: Array, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: {type: Boolean, default: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
