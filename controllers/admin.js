const { updateProduct } = require("../models/product");
const Product = require("../models/product");

const getAdminProductsPage = (req, res) => {
  Product.fetchAllProducts((products) => {
    res.render("admin/products", {
      pageTitle: "Admin Products Page",
      path: "/admin/products",
      products: products,
    });
  });
};

const getAdminAddProductPage = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Admin Add Product Page",
    path: "/admin/add-product",
    editMode: false,
  });
};

const getAdminEditProductPage = (req, res) => {
  const editMode = req.query.editMode === "true" ? true : false;
  const productId = req.params.productId;
  if (!editMode) {
    res.redirect("/");
  }
  Product.findById(productId, (product) => {
    if (!product) {
      // no product found
      res.status(404).render("not-found", {
        pageTitle: "Error 404 Not Found",
        path: "",
      });
    }
    res.render("admin/edit-product", {
      pageTitle: "Admin Edit Product Page",
      path: "/admin/edit-product",
      editMode: editMode,
      product: product,
    });
  });
};

const postAdminAddProduct = (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.saveProduct();
  res.redirect("/shop/products");
};

const postAdminEditProduct = (req, res) => {
  let productToBeUpdated = new Product(req.body);
  productToBeUpdated.updateProduct(productToBeUpdated);
  res.redirect("/admin/products");
};

module.exports = {
  getAdminAddProductPage,
  getAdminProductsPage,
  postAdminAddProduct,
  getAdminEditProductPage,
  postAdminEditProduct,
};
