// IMPORTS
const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");

const { router: shopRouter } = require("./routes/shop");
const rootDir = require("./utils/path");

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
app.use("*", (req, res, next) => {
  res.status(404).render("not-found", {
    pageTitle: "Error 404 Not Found",
    path: "",
  });
});

app.listen(3000);
