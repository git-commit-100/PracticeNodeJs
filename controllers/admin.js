const { updateProduct, deleteProduct } = require("../models/product");
const Product = require("../models/product");

const getAdminProductsPage = (req, res) => {
  Product.fetchAllProducts()
    .then(([result, metadata]) => {
      res.render("admin/products", {
        pageTitle: "Admin Products Page",
        path: "/admin/products",
        products: result,
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

  Product.findById(productId)
    .then(([result]) => {
      const [product] = result;
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
  const newProduct = new Product(req.body);
  newProduct
    .saveProduct()
    .then(() => {
      res.redirect("/shop/products");
    })
    .catch((err) => console.log(err));
};

const postAdminEditProduct = (req, res) => {
  let productToBeUpdated = new Product(req.body);

  Product.updateProduct(productToBeUpdated)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const postAdminDeleteProduct = (req, res) => {
  Product.findById(req.body.productId)
    .then(([result]) => {
      const [product] = result;

      Product.deleteProduct(product.id)
        .then(() => {
          res.redirect("/admin/products");
        })
        .catch((err) => {
          throw new err();
        });
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
