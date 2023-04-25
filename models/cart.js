const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Cart = sequelize.define("Cart", {
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  ProductId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: "Products",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

module.exports = Cart;
