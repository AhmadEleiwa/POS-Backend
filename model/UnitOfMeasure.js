const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UnitOfMeasure = Schema({
  unitOfMeaureName: { type: String, required: true, unique: true },
  baseUnitOfMeaure: { type: String, required: true },
  conversionFactor: { type: Number, required: true },
});

module.exports = mongoose.model("UnitOfMeasure", UnitOfMeasure);
