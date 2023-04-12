// IMPORTS
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const rootDir = require("./utils/path");
const { get404 } = require("./controllers/error");
const shopRouter = require("./routes/shop");
const adminRouter = require("./routes/admin");

const sequelize = require("./utils/database");
const { log } = require("console");

// using templating engine
app.set("view engine", "ejs");
app.set("views", "views");

// to parse all requests
app.use(bodyParser.urlencoded({ extended: false }));

// static serving to .css files
app.use(express.static(path.join(rootDir, "public")));

// ROUTES
app.use("/shop", shopRouter);
app.use("/admin", adminRouter);

// default route
app.get("/", (req, res, next) => {
  res.redirect("/shop");
});

// fallback page
app.use("*", get404);

// creating a table in db
sequelize
  .sync()
  .then(() => {
    app.listen(3000);
    console.log("Connected to db successfully");
  })
  .catch((err) => console.log(err));
