const Product = require("../models/product");
const Cart = require("../models/cart");

// PRODUCTS
const getShopIndexPage = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Shop Page",
    path: "/",
  });
};

const getShopProductsPage = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/products", {
        pageTitle: "Products Page",
        path: "/shop/products",
        products: products, // [data] or []
      });
    })
    .catch((err) => console.log(err));
};

const getShopProductDetailPage = (req, res, next) => {
  const { productId } = req.params;

  Product.findOne({ where: { id: productId } })
    .then((product) => {
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
    })
    .catch((err) => console.log(err));
};

// CART
const getShopCart = (req, res, next) => {
  Cart.fetchAllCartProducts((cartState) => {
    res.render("shop/cart", {
      pageTitle: "Cart Page",
      path: "/shop/cart",
      cartState: cartState,
    });
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

module.exports = {
  getShopProductsPage,
  getShopCart,
  getShopCheckoutPage,
  getShopProductDetailPage,
  getShopIndexPage,
  postShopCart,
};
