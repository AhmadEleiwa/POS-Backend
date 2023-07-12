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
  const { productName, productCategory, unitOfMeasure, productPrice } =
    req.body;
  const { id } = req.params;
  const image = req.file;
  let product;
  let unit = await UnitOfMeasure.findOne({unitOfMeasureName:unitOfMeasure})
  let cate = await Category.findOne({categoryName:productCategory})
  try {
    if (image) {
      product = await Product.findByIdAndUpdate(
        id,
        {
          productName,
          productCategory: cate,
          unitOfMeasure:unit,
          productPrice,
          productImage: image.path,
        },
        { returnOriginal: true }
      );
      try {
        fs.unlinkSync(product.productImage);
      } catch (err) {}
    } else
      product = await Product.findByIdAndUpdate(
        id,
        {
          productName,
          productCategory:cate,
          unitOfMeasure:unit,
          productPrice,
        },
        {
          returnOriginal: true,
        }
      );
  } catch (err) {
    if (image) fs.unlinkSync(image.path);
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
      unitOfMeasure: await UnitOfMeasure.findOne({
        unitOfMeaureName: unitOfMeasure,
      }),
    });
  } catch (err) {
    fs.unlinkSync(imagePath.path);
    return res
      .status(402)
      .json({ message: "Could not Create new product, please try again" });
  }
  if (!product) {
    try {
      product = new Product({
        productName: productName,
        productCategory: await Category.findOne({
          categoryName: productCategory,
        }),
        unitOfMeasure: await UnitOfMeasure.findOne({
          unitOfMeasureName: unitOfMeasure,
        }),
        productPrice: productPrice,
        productImage: imagePath.path,
      });
      product.save();
      return res.status(201).json({ id: product.id });
    } catch (err) {
      fs.unlinkSync(imagePath.path);
      return res.status(402).json({ message: "The product is already exists" });
    }
  }
  fs.unlinkSync(imagePath.path);
  return res.status(402).json({ message: "The product is already exists" });
};

const clearAll = async (req, res) => {
  await Product.deleteMany();
  return res.status(201).json({ message: "delete all items" });
};

exports.getAllProduct = getAllProduct;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
exports.createProduct = createProduct;
exports.clearAll = clearAll;
