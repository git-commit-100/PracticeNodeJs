const express = require("express");

const router = express.Router();

const {
  getAdminAddProductPage,
  postAdminAddProduct,
  getAdminProductsPage,
} = require("../controllers/admin");

// route -> /admin/add-product (GET)
router.get("/add-product", getAdminAddProductPage);

// route -> /admin/add-product (POST)
router.post("/add-product", postAdminAddProduct);

// route -> /admin/products
router.get("/products", getAdminProductsPage);

module.exports = router;
