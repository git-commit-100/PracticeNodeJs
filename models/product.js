const db = require("../utils/database");

class Product {
  constructor(productObj) {
    const { productId, productTitle, productDesc, productImg, productPrice } =
      productObj;

    this.id = productId;
    this.title = productTitle;
    this.desc = productDesc;
    this.img = productImg.toString();
    this.price = productPrice;
    this.quantity = 1;
  }

  // (?,?,?,?) -> sanitizes user input to harmless string

  saveProduct() {
    return db.execute(
      "INSERT INTO products (title, `desc`, img, quantity, price) VALUES (?, ?, ?, ?, ?)",
      [this.title, this.desc, this.img, this.quantity, this.price]
    );
  }

  static fetchAllProducts() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  static updateProduct(product) {
    const { id, title, img, desc, price } = product;
    return db.execute(
      "UPDATE products SET title = ?, img = ?, `desc` = ?, price = ? WHERE products.id = ?",
      [title, img, desc, price, id]
    );
  }

  static deleteProduct(id) {
    return db.execute("DELETE FROM products WHERE products.id = ?", [id]);
  }
}

module.exports = Product;
