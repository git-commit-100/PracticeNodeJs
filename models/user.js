import { DataTypes } from "sequelize";

import sequelize from "../utils/database";

const User = sequelize.define("User", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

module.exports = User;
