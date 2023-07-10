const express = require("express");
const {
  getAllCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} = require("../controller/category-controller");

const router = express.Router();

router.get("/units", getAllCategories);
router.delete("/delete/:id", deleteCategory);
router.patch("/update/:id", updateCategory);
router.post("/new", createCategory);

module.exports = router;
