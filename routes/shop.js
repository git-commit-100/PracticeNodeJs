const express = require("express");

const router = express.Router();

// route for /shop/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/shop/add-product" method="POST"><input type="text" name="title"/><button type="submit">Add Product</button></form>'
  );
});

// routes can contain same name with different methods

// route for /shop/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
