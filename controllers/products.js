const Product = require("../models/product");

const getProductsPage = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("products", {
      pageTitle: "Products Page",
      path: "/shop/products",
      products: products, // [data] or []
    });
  });
};

const getAddProductPage = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product Page",
    path: "/shop/add-product",
  });
};

const postAddProduct = (req, res, use) => {
  const newProduct = new Product(req.body);
  newProduct.saveProduct();
  res.redirect("/shop/products");
};

module.exports = {
  getProductsPage,
  getAddProductPage,
  postAddProduct,
};
