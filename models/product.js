const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");
const filePath = path.join(rootDir, "data", "products.json");

class Product {
  constructor(productObj) {
    const { productTitle, productDesc, productImg, productPrice } = productObj;

    this.title = productTitle;
    this.desc = productDesc;
    this.img = productImg;
    this.price = productPrice;
  }

  saveProduct() {
    let products = [];
    // is file present already ????
    fs.readFile(filePath, (err, fileContent) => {
      if (!err) {
        // file already exists
        products = JSON.parse(fileContent);
      }
      // 1st product if skipping if check
      products.push({
        title: this.title,
        desc: this.desc,
        img: this.img,
        price: this.price,
      });

      // writing to a file
      fs.writeFile(filePath, JSON.stringify(products), (err, fileContent) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAllProducts(callback) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        // file don't exist -> passing empty array
        return callback([]);
      }
      return callback(JSON.parse(fileContent));
    });
  }
}

module.exports = Product;
