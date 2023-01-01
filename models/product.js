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
    const { productTitle, productDesc, productImg, productPrice } = productObj;

    this.id = randomUUID();
    this.title = productTitle;
    this.desc = productDesc;
    this.img = productImg.toString();
    this.price = productPrice;
    this.quantity = 0;
  }

  saveProduct() {
    getDataFromFiles((products) => {
      products.push({
        id: this.id,
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
}

module.exports = Product;
