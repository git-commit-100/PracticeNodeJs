const Product = require("../models/product");
const Cart = require("../models/cart");

const getShopIndexPage = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Shop Page",
    path: "/",
  });
};

const getShopProductsPage = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("shop/products", {
      pageTitle: "Products Page",
      path: "/shop/products",
      products: products, // [data] or []
    });
  });
};

const getShopCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart Page",
    path: "/shop/cart",
  });
};

const postShopCart = (req, res, next) => {
  let { productId } = req.body;
  Product.findById(productId, (product) => {
    // finding the product
    Cart.addToCart(product);
  });
};

const getShopCheckoutPage = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout Page",
    path: "/shop/checkout",
  });
};

const getShopProductDetailPage = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    if (product) {
      // found product
      res.render("shop/product-detail", {
        pageTitle: product.title,
        path: `/shop/products/${product.id}`,
        product: product,
      });
    } else {
      // no product found
      res.status(404).render("not-found", {
        pageTitle: "Error 404 Not Found",
        path: "",
      });
    }
  });
};

module.exports = {
  getShopProductsPage,
  getShopCart,
  getShopCheckoutPage,
  getShopProductDetailPage,
  getShopIndexPage,
  postShopCart,
};
