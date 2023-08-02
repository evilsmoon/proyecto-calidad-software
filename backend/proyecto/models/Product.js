const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
    default: undefined,
  },
  picture: {
    type: String,
  },
});

module.exports = model("Producto", ProductSchema);
