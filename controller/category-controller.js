const Category = require("../model/Category");

const getAllCategories = async (req, res) => {
  let categories;
  try {
    categories = await Category.find();
  } catch (err) {
    return res.status(404).json({ message: "No data found" });
  }
  return res.status(201).json(categories);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  let category;
  try {
    category = await Category.findOneAndUpdate(
      { categoryName: id },
      { categoryName: categoryName }
    );
  } catch (err) {
    return res
      .status(402)
      .json({ message: "Could not update the category, please try again" });
  }
  if (category) {
    return res.status(201).json({ message: "date have been updated" });
  }
  return res.status(402).json({ message: "No match with this category name" });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  let category;
  try {
    category = await Category.findOneAndDelete({ categoryName: id });
  } catch (err) {
    return res
      .status(402)
      .json({ message: "Could not delete the category, please try again" });
  }
  if (category) {
    return res.status(201).json({ message: "date have been deleted" });
  }
  return res.status(402).json({ message: "No match with this category name" });
};

const createCategory = async (req, res) => {
  const { categoryName } = req.body;
  let category;
  try {
    category = await Category.findOne({ categoryName: categoryName });
  } catch (err) {
    return res
      .status(402)
      .json({ message: "Could not Create new category, please try again" });
  }
  if (!category) {
    category = new Category({
      categoryName,
    });
    category.save();
    return res.status(201).json({message:"New catgory have been created"})
  }
  return res
    .status(402)
    .json({ message: "The category name is already exists" });
};

exports.getAllCategories = getAllCategories;
exports.deleteCategory = deleteCategory;
exports.updateCategory = updateCategory;
exports.createCategory = createCategory;
