const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UnitOfMeasure = Schema({
  unitOfMeasureName: { type: String, required: true, unique: true },
  baseUnitOfMeasure: { type: String, required: true },
  conversionFactor: { type: Number, required: true },
});

module.exports = mongoose.model("UnitOfMeasure", UnitOfMeasure);
