const express = require("express");
const {
  getAllCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} = require("../controller/category-controller");

const router = express.Router();

router.get("/categories", getAllCategories);
router.delete("/delete/:id", deleteCategory);
router.post("/update/:id", updateCategory);
router.post("/new", createCategory);

module.exports = router;
