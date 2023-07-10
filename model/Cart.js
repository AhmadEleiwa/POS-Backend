const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ceil = Schema({
  porduct: { type: Schema.Types.ObjectId, ref: "Product" },
  qty: { type: Number },
});

const Cart = Schema({
  desdription: { type: String, required: true },
  tax: { type: Number, required: true },
  discount: { type: Number, required: true },
  products: [{ type: ceil, default: {} }],
});

module.exports = mongoose.model("Cart", Cart);
