const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Category = Schema({
  categoryName: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Category", Category);
