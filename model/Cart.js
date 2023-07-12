const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ceil = Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required:true },
  qty: { type: Number ,required:true },
});

const Cart = Schema({
  description: { type: String, required: true },
  tax: { type: Number, required: true },
  discount: { type: Number, required: true },
  products: [{ type: ceil, default: {} }],
});

module.exports = mongoose.model("Cart", Cart);
