const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Product = Schema({
  productName: { type: String, required: true },
  productCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  unitOfMeasure: {
    type: Schema.Types.ObjectId,
    ref: "UnitOfMeasure",
    required: true,
  },
  productImage: { type: String, required:true },
  productPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Product", Product);
