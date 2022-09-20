const fs = require("fs");
const { url } = require("inspector");
const path = require("path");

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

    this.title = productTitle;
    this.desc = productDesc;
    this.img = productImg.toString();
    this.price = productPrice;
  }

  saveProduct() {
    getDataFromFiles((products) => {
      products.push({
        title: this.title,
        img: this.img,
        desc: this.desc,
        price: this.price,
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
}

module.exports = Product;
