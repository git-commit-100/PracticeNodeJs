const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");

const router = express.Router();

const productsArr = [];

// route for /shop/products => GET
router.get("/products", (req, res, next) => {
  res.render("products", {
    pageTitle: "Products Page",
    path: "/shop/products",
    products: productsArr,
  });
});

// route for /shop/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product Page",
    path: "/shop/add-product",
  });
});

// routes can contain same name with different methods

// route for /shop/add-product => POST
router.post("/add-product", (req, res, next) => {
  productsArr.push({ title: req.body.product });
  console.log(productsArr);
  res.redirect("/shop/products");
});

module.exports = {
  router,
  productsArr,
};
