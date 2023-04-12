const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("practice_node", "root", "sqlR00tPa$$", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
