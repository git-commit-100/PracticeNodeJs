const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");

const router = express.Router();

// route for /shop/products => GET
router.get("/products", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "products.html"));
});

// route for /shop/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// routes can contain same name with different methods

// route for /shop/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
