const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const rootDir = require("../utils/path");
const filePath = path.join(rootDir, "data", "products.json");

const getDataFromFiles = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      // file don't exist -> passing empty array to callback fn
      return callback([]);
    }
    // file exists -> forwarding data to callback fn
    return callback(JSON.parse(fileContent));
  });
};

class Product {
  constructor(productObj) {
    const { productId, productTitle, productDesc, productImg, productPrice } =
      productObj;

    this.id = productId ? productId : null;
    this.title = productTitle;
    this.desc = productDesc;
    this.img = productImg.toString();
    this.price = productPrice;
    this.quantity = 1;
  }

  saveProduct() {
    getDataFromFiles((products) => {
      products.push({
        id: randomUUID(),
        title: this.title,
        img: this.img,
        desc: this.desc,
        price: this.price,
        quantity: this.quantity,
      });
      // writing to file
      fs.writeFile(filePath, JSON.stringify(products), (err, fileContent) => {
        if (err) {
          console.log(err);
        } else {
          // log file data
          console.log(fileContent);
        }
      });
    });
  }

  static fetchAllProducts(callback) {
    getDataFromFiles(callback);
  }

  static findById(id, callback) {
    getDataFromFiles((products) => {
      // product is an array []
      const product = products.find((prod) => {
        if (prod.id === id) {
          return prod;
        }
      });

      if (product) {
        // product is found
        callback(product);
      } else {
        callback(undefined);
      }
    });
  }

  updateProduct(product) {
    Product.fetchAllProducts((productsArr) => {
      let existingProductIndex = productsArr.findIndex(
        (prod) => prod.id === product.id
      );

      let existingProduct = productsArr[existingProductIndex];

      console.log("Existing Product", existingProduct);
      console.log("Product from req", product);

      if (existingProduct) {
        // product exists -> change product
        productsArr[existingProductIndex] = {...product};

        // write to file
        fs.writeFile(filePath, JSON.stringify(productsArr), (err) => {
          console.log(err);
        });
      }
    });
  }
}

module.exports = Product;
