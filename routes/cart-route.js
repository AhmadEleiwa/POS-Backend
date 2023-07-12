const express = require("express");
const { checkCart, getCarts } = require("../controller/cart-controller");

const router = express.Router();
router.get("/carts", getCarts);
router.post("/check", checkCart);
module.exports = router;
