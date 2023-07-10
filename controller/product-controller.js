const Category = require("../model/Category");
const Product = require("../model/Product");
const UnitOfMeasure = require("../model/UnitOfMeasure");
var fs = require("fs");

const getAllProduct = async (req, res) => {
  let product;
  try {
    product = await Product.find().populate([
      "productCategory",
      "unitOfMeasure",
    ]);
  } catch (err) {
    return res.status(404).json({ message: "No data found" });
  }
  return res
    .status(201)
    .json(product.map((p) => p.toObject({ getters: true })));
};

const updateProduct = async (req, res) => {
  let { payload } = req.body;
  const { id } = req.params;
  const image = req.file;

  if (typeof payload === "string") payload = JSON.parse(payload);
  let product;
  if (payload.productCategory) {
    let category;
    try {
      category = await Category.findOne({
        categoryName: payload.productCategory,
      });
    } catch (err) {
      fs.unlinkSync(image.path);
      return res
        .status(402)
        .json({ message: "No unit of measure match for this product" });
    }
    if (category) {
      payload.productCategory = category;
    } else {
      fs.unlinkSync(image.path);
      return res
        .status(402)
        .json({ message: "No unit of measure match for this product" });
    }
  }
  if (payload.unitOfMeasure) {
    let unitOfMeasure;
    try {
      unitOfMeasure = await UnitOfMeasure.findOne({
        unitOfMeaureName: payload.unitOfMeasure,
      });
    } catch (err) {
      fs.unlinkSync(image.path);
      return res
        .status(402)
        .json({ message: "No unit of measure match for this product" });
    }
    if (unitOfMeasure) {
      payload.unitOfMeasure = unitOfMeasure;
    } else {
      fs.unlinkSync(image.path);
      return res
        .status(402)
        .json({ message: "No unit of measure match for this product" });
    }
  }
  try {
    if (image) {
      product = await Product.findByIdAndUpdate(
        id,
        { ...payload, productImage: image.path },
        { returnOriginal: true }
      );
      try {
        fs.unlinkSync(product.productImage);
      } catch (err) {}
    } else
      product = await Product.findByIdAndUpdate(id, payload, {
        returnOriginal: true,
      });
  } catch (err) {
    fs.unlinkSync(image.path);
    console.log(err);
    return res
      .status(402)
      .json({ message: "Could not update the product, please try again" });
  }
  if (product) {
    return res.status(201).json({ message: "date have been updated" });
  }
  fs.unlinkSync(image.path);
  return res.status(402).json({ message: "No match with this product" });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  let product;
  try {
    product = await Product.findByIdAndDelete(id);
  } catch (err) {
    return res
      .status(402)
      .json({ message: "Could not delete the product, please try again" });
  }
  if (product) {
    return res.status(201).json({ message: "date have been deleted" });
  }
  return res.status(402).json({ message: "No match with this product" });
};

const createProduct = async (req, res) => {
  const { productName, productCategory, unitOfMeasure, productPrice } =
    req.body;
  const imagePath = req.file;
  let product;
  try {
    product = await Product.findOne({
      productName: productName,
      unitOfMeasure: unitOfMeasure,
    });
  } catch (err) {
    return res
      .status(402)
      .json({ message: "Could not Create new product, please try again" });
  }
  if (!product) {
    product = new Product({
      productName: productName,
      productCategory: await Category.findOne({
        categoryName: productCategory,
      }),
      unitOfMeasure: await UnitOfMeasure.findById(unitOfMeasure),
      productPrice: productPrice,
      productImage: imagePath,
    });
    product.save();
    return res.status(201).json({ message: "New product have been created" });
  }
  return res.status(402).json({ message: "The product is already exists" });
};

exports.getAllProduct = getAllProduct;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
exports.createProduct = createProduct;
