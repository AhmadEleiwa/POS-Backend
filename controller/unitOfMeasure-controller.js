const UnitOfMeasure = require("../model/UnitOfMeasure");

const getAllUnits = async (req, res) => {
  let categories;
  try {
    categories = await UnitOfMeasure.find();
  } catch (err) {
    return res.status(404).json({ message: "No data found" });
  }
  return res.status(201).json(categories);
};

const updateUnit = async (req, res) => {
  const { id } = req.params;
  const { unitOfMeasureName, baseUnitOfMeasure, conversionFactor } = req.body;
  console.log(unitOfMeasureName);
  let unit;
  try {
    unit = await UnitOfMeasure.findOneAndUpdate(
      { unitOfMeasureName: id },
      { unitOfMeasureName, baseUnitOfMeasure, conversionFactor }
    );
  } catch (err) {
    return res
      .status(402)
      .json({ message: "Could not update the unit, please try again" });
  }
  if (unit) {
    return res.status(201).json({ message: "date have been updated" });
  }
  return res.status(402).json({ message: "No match with this unit name" });
};

const deleteUnit = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  let unit;
  try {
    unit = await UnitOfMeasure.findOneAndDelete({ unitOfMeasureName: id });
  } catch (err) {
    return res
      .status(402)
      .json({ message: "Could not delete the unit, please try again" });
  }
  if (unit) {
    return res.status(201).json({ message: "date have been deleted" });
  }
  return res.status(402).json({ message: "No match with this unit name" });
};

const createUnit = async (req, res) => {
  const { unitOfMeasureName, baseUnitOfMeasure, conversionFactor } = req.body;
  console.log(unitOfMeasureName, conversionFactor);
  let unit;
  try {
    unit = await UnitOfMeasure.findOne({ unitOfMeasureName: unitOfMeasureName });
  } catch (err) {
    return res
      .status(402)
      .json({ message: "Could not Create new unit, please try again" });
  }
  if (!unit) {
    unit = new UnitOfMeasure({
      unitOfMeasureName: unitOfMeasureName,
      baseUnitOfMeasure: baseUnitOfMeasure,
      conversionFactor: conversionFactor,
    });
    unit.save();
    return res.status(201).json({ message: "New unit have been created" });
  }
  return res.status(402).json({ message: "The unit name is already exists" });
};

exports.getAllUnits = getAllUnits;
exports.deleteUnit = deleteUnit;
exports.updateUnit = updateUnit;
exports.createUnit = createUnit;
