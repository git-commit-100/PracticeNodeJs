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
  // get cart by user logged in (id)
  const productKeys = [];
  const quantityArr = [];

  Cart.findAll({ where: { UserId: req.user.id } })
    .then((cartData) => {
      // get products details

      cartData.forEach((prod) => {
        const { ProductId, quantity } = prod;
        productKeys.push(+ProductId);
        quantityArr.push(+quantity);
      });

      return Product.findAll({ where: { id: productKeys } });
    })
    .then((products) => {
      res.render("shop/cart", {
        pageTitle: "Cart Page",
        path: "/shop/cart",
        products: products,
        quantityArr: quantityArr,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postShopCart = (req, res, next) => {
  let { productId } = req.body;

  // find if a product already exists in cart
  Cart.findOne({ where: { ProductId: +productId } })
    .then((product) => {
      console.log(product);
      if (product) {
        // in cart -> update quantity
        product.quantity++;
        return product.save();
      } else {
        // add to cart
        return Cart.create({
          quantity: 1,
          ProductId: productId,
          UserId: req.user.id,
        });
      }
    })
    .then(() => {
      res.redirect("/shop/cart");
    })
    .catch((err) => console.log(err));
};

const getShopCheckoutPage = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout Page",
    path: "/shop/checkout",
  });
};

const postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;

  Cart.destroy({ where: { ProductId: productId } })
    .then(() => {
      res.redirect("/shop/cart");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getShopProductsPage,
  getShopCart,
  getShopCheckoutPage,
  getShopProductDetailPage,
  getShopIndexPage,
  postShopCart,
  postCartDeleteProduct,
};
