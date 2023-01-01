const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const filePath = path.join(rootDir, "data", "cart.json");

class Cart {
  static addToCart(productObj) {
    let cartState = { products: [], totalPrice: 0 };

    //if file exists, parse data in JSON
    fs.readFile(filePath, (err, fileContent) => {
      if (!err && fileContent) {
        // present in file
        let data = JSON.parse(fileContent);

        let { products: cartProducts, totalPrice: cartTotalPrice } = data;

        // if product already exists ? increment quantity : push product into array
        let existingProductIndex = cartProducts.findIndex((product) => {
          if (productObj.id === product.id) {
            return product;
          }
        });

        let existingProduct = cartProducts[existingProductIndex];

        if (!!existingProduct) {
          // product already exists -> update quantity
          let updatedProduct = {
            quantity: existingProduct.quantity++,
            ...existingProduct,
          };

          //replace product from cart
          cartProducts[existingProductIndex] = updatedProduct;
          console.log(cartProducts);
        } else {
          // product does not exist -> add to array
          cartProducts.push(productObj);
          console.log(cartProducts);
        }

        // updating cart totalPrice
        cartTotalPrice = +cartTotalPrice + +productObj.price;

        cartState = { products: cartProducts, totalPrice: cartTotalPrice };
      } else {
        // file does not exist
        cartState.products.push(productObj);
        cartState.totalPrice = +productObj.price;
      }

      console.log(cartState);

      // writing to file
      fs.writeFile(filePath, JSON.stringify(cartState), (err, fileContent) => {
        err ? console.log(err) : console.log(fileContent);
      });
    });
  }
}

module.exports = Cart;
