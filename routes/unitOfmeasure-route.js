const express = require("express");
const { getAllUnits, deleteUnit, updateUnit, createUnit } = require("../controller/unitOfMeasure-controller");

const router = express.Router();



router.get("/categories", getAllUnits);
router.delete("/delete/:id", deleteUnit);
router.patch("/update/:id", updateUnit);
router.post("/new", createUnit);


module.exports = router