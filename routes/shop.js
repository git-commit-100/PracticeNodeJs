const express = require("express");

// using express router
const router = express.Router();

const productsArr = [];

// route -> /shop/products
router.get("/products", (req, res, next) => {
  res.render("products", {
    pageTitle: "Products Page",
    path: "/shop/products",
    products: productsArr,
  });
});

// route -> /shop/add-product (GET)
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product Page",
    path: "/shop/add-product",
  });
});

// route -> /shop/add-product (POST)
router.post("/add-product", (req, res, use) => {
  // pushing new product to array
  const {
    productTitle: title,
    productDesc: desc,
    productImg: img,
    productPrice: price,
  } = req.body;
  productsArr.push({ title, desc, img, price });
  res.redirect("/shop/products");
});

module.exports = {
  router,
  productsArr,
};
