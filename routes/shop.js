const express = require("express");

// using express router
const router = express.Router();

// importing controller functions
const {
  getShopProductsPage,
  getShopCart,
  getShopCheckoutPage,
  getShopProductDetailPage,
  getShopIndexPage,
  postShopCart,
  postCartDeleteProduct,
} = require("../controllers/products");

// route -> /shop/products/someProduct()
router.get("/products/:productId", getShopProductDetailPage);

// route -> /shop/products
router.get("/products", getShopProductsPage);

// route -> /shop/cart/id -> delete
router.post("/cart/delete", postCartDeleteProduct);

// route -> /shop/cart
router.get("/cart", getShopCart);

// route -> /shop/cart POST
router.post("/cart", postShopCart);

// route -> /shop/checkout
router.get("/checkout", getShopCheckoutPage);

// route -> /shop/
router.get("/", getShopIndexPage);

module.exports = router;
