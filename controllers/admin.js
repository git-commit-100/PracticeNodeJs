const Product = require("../models/product");

const getAdminProductsPage = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        pageTitle: "Admin Products Page",
        path: "/admin/products",
        products: products,
      });
    })
    .catch((err) => console.log(err));
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

  Product.findOne({ where: { id: productId } })
    .then((product) => {
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
    })
    .catch((err) => console.log(err));
};

const postAdminAddProduct = (req, res) => {
  const {
    productTitle: title,
    productDesc: desc,
    productImg: img,
    productPrice: price,
  } = req.body;

  // we are getting this from User model passed in req obj
  // sequelize creates magic methods for associations

  req.user
    .createProduct({
      title,
      desc,
      img,
      price,
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const postAdminEditProduct = (req, res) => {
  const {
    productTitle: title,
    productDesc: desc,
    productImg: img,
    productPrice: price,
    productId,
  } = req.body;

  Product.findOne({ where: { id: productId } })
    .then((product) => {
      if (!product) {
        // no product found
        res.status(404).render("not-found", {
          pageTitle: "Error 404 Not Found",
          path: "",
        });
      } else {
        (product.title = title),
          (product.desc = desc),
          (product.img = img),
          (product.price = price);
        return product.save();
      }
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const postAdminDeleteProduct = (req, res) => {
  const { productId } = req.body;

  Product.destroy({ where: { id: productId } })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getAdminAddProductPage,
  getAdminProductsPage,
  postAdminAddProduct,
  getAdminEditProductPage,
  postAdminEditProduct,
  postAdminDeleteProduct,
};
