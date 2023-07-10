const express = require("express");
const { getAllProduct, createProduct, updateProduct, deleteProduct } = require("../controller/product-controller");
const { imageUpload } = require("../middleware/file-upload");

const router = express.Router();

router.get('/products',getAllProduct)
router.post('/update/:id', imageUpload.single('image'),updateProduct)

router.post('/new', imageUpload.single('image'),createProduct)
router.delete('/delete/:id',deleteProduct)

module.exports = router