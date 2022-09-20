// IMPORTS
const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");

const shopRouter = require("./routes/shop");
const rootDir = require("./utils/path");
const { get404 } = require("./controllers/error");

// using templating engine
app.set("view engine", "ejs");
app.set("views", "views");

// to parse all requests
app.use(bodyParser.urlencoded({ extended: false }));

// static serving to .css files
app.use(express.static(path.join(rootDir, "public")));

// ROUTES
app.use("/shop", shopRouter);

// default route
app.get("/", (req, res, next) => {
  res.redirect("/shop/products");
});

// fallback page
app.use("*", get404);

app.listen(3000);
