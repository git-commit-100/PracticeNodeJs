const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const filePath = path.join(rootDir, "data", "cart.json");

const getCartDataFromFiles = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      // file don't exist -> passing empty array to callback fn
      return callback({ products: [], totalPrice: 0 });
    } else {
      // file exists -> forwarding data to callback fn
      return callback(JSON.parse(fileContent));
    }
  });
};
class Cart {
  static addToCart(product) {
    //? add / increment to cart

    getCartDataFromFiles((cartState) => {
      // as productObj.quantity is 0 -> updating here
      let productObj = { ...product, quantity: 1 };

      if (cartState.products.length === 0) {
        // no file
        cartState.products.push(productObj);
      } else {
        // file has some content
        // find if product is already in cart
        let existingProductIndex = cartState.products.findIndex(
          (prod) => prod.id === productObj.id
        );
        let existingProduct = cartState.products[existingProductIndex];

        if (existingProduct) {
          // product exists -> update quantity
          let updatedCartProduct = {
            quantity: existingProduct.quantity++,
            ...existingProduct,
          };

          // swapping updated product
          cartState.products[existingProductIndex] = updatedCartProduct;
        } else {
          // push product into array
          cartState.products.push(productObj);
        }
      }
      cartState.totalPrice = +cartState.totalPrice + +productObj.price;
      // console.table(cartState);

      // writing to file
      fs.writeFile(filePath, JSON.stringify(cartState), (err) => {
        console.log(err);
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
