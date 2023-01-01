const express = require("express");

const router = express.Router();

const {
  getAdminAddProductPage,
  postAdminAddProduct,
  getAdminProductsPage,
  getAdminEditProductPage,
  postAdminEditProduct,
} = require("../controllers/admin");

// route -> /admin/add-product (GET)
router.get("/add-product", getAdminAddProductPage);

// route -> /admin/add-product (POST)
router.post("/add-product", postAdminAddProduct);

// route -> /admin/products
router.get("/products", getAdminProductsPage);

// route -> /admin/edit-product
router.get("/edit-product/:productId", getAdminEditProductPage);

router.post("/edit-product", postAdminEditProduct);

module.exports = router;
