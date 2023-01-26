const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const filePath = path.join(rootDir, "data", "cart.json");

const getCartDataFromFiles = (callback) => {
  let initialCartState = { products: [], totalPrice: 0 };
  fs.readFile(filePath, (err, fileContent) => {
    if (err || fileContent.length === 0) {
      // file don't exist -> passing empty array to callback fn
      callback(initialCartState);
    } else {
      // file exists -> forwarding data to callback fn
      callback(JSON.parse(fileContent));
    }
  });
};
class Cart {
  static addToCart(productObj) {
    //? add / increment to cart

    getCartDataFromFiles((cartState) => {
      let existingProductIndex = cartState.products.findIndex(
        (prod) => prod.id === productObj.id
      );

      let existingProduct = cartState.products[existingProductIndex];

      if (existingProduct) {
        // product exists in cart -> update quantity
        let updatedProduct = {
          ...existingProduct,
          quantity: +existingProduct.quantity + 1,
        };

        // swapping updated in place of old product
        cartState.products[existingProductIndex] = updatedProduct;
      } else {
        // either no file / no product in cart -> add to array
        cartState.products.push(productObj);
      }

      // updating totalPrice
      cartState.totalPrice += +productObj.price;

      // writing to file
      fs.writeFile(filePath, JSON.stringify(cartState), (err) => {
        if (err) console.log(err);
      });
    });
  }

  static fetchAllCartProducts(callback) {
    getCartDataFromFiles(callback);
  }

  static deleteFromCart(productObj) {
    //? remove / decrement from cart
  }

  static forceDeleteFromCart(productId) {
    //! force remove if admin removes product from product file -> prod no longer exists
  }
}

module.exports = Cart;
