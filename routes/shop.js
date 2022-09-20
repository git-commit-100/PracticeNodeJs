const express = require("express");

// using express router
const router = express.Router();

// importing controller functions
const {
  getProductsPage,
  getAddProductPage,
  postAddProduct,
} = require("../controllers/products");

// route -> /shop/products
router.get("/products", getProductsPage);

// route -> /shop/add-product (GET)
router.get("/add-product", getAddProductPage);

// route -> /shop/add-product (POST)
router.post("/add-product", postAddProduct);

module.exports = router;
