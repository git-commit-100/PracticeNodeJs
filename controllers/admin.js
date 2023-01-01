const Product = require("../models/product");

const getAdminProductsPage = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("admin/products", {
      pageTitle: "Admin Products Page",
      path: "/admin/products",
      products: products,
    });
  });
};

const getAdminAddProductPage = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Admin Add Product Page",
    path: "/admin/add-product",
  });
};

const postAdminAddProduct = (req, res, use) => {
  const newProduct = new Product(req.body);
  newProduct.saveProduct();
  res.redirect("/shop/products");
};

module.exports = {
  getAdminAddProductPage,
  getAdminProductsPage,
  postAdminAddProduct,
};
