const express = require("express");
const { getAllUnits, deleteUnit, updateUnit, createUnit } = require("../controller/unitOfMeasure-controller");

const router = express.Router();



router.get("/units", getAllUnits);
router.delete("/delete/:id", deleteUnit);
router.post("/update/:id", updateUnit);
router.post("/new", createUnit);


module.exports = router