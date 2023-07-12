const Cart = require("../model/Cart");
const Product = require("../model/Product");

const getCarts = async (req, res) => {
  let carts;
  try {
    carts = await Cart.find().populate({
      path: "products",
      populate: { path: "product" },
    });
  } catch (err) {
    return res.status(404).json({ message: "Error on fetching carts" });
  }
  if (carts) {
    console.log(carts);
    return res.status(201).json(carts);
  }
  return res.status(401).json({ message: "No carts Found" });
};

const checkCart = async (req, res) => {
  const { description, tax, discount, products } = req.body;
  console.log(description);
  let cart;
  let prods = await Product.find({
    _id: { $in: products.map((p) => p.product) },
  });
  prods = prods.map((p, index) => {
    return {product:p, qty:products[index].qty}
  });
  console.log(prods)
  try {
    cart = new Cart({
      description,
      tax,
      discount,
      products: prods
    });
    cart.save();
  } catch (err) {
    return res.status(404).json({ message: "Error on fetching carts" });
  }
  if (cart) {
    return res
      .status(201)
      .json({ message: "Cart have been added into database" });
  }
  return res.status(401).json({ message: "No carts Found" });
};

exports.checkCart = checkCart;
exports.getCarts = getCarts;
