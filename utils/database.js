const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "practice_node",
    password: "sqlR00tPa$$",
})

module.exports = pool.promise();