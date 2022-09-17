// creating an express app
const express = require("express");
const path = require("path");
const app = express();

const rootDir = require("./utils/path");

// using templating engine EJS
app.set("view engine", "ejs");
app.set("views", "views");

// importing body-parser
const bodyParser = require("body-parser");

// importing routes
const { router: indexRoutes } = require("./routes/index");
const { router: shopRoutes } = require("./routes/shop");

// working with middleware
// Request -> Middleware -> Response

// when we use app.use() only for POST request
// gets executed even for other http requests;
// using express req methods app.get(), app.post(), app.put(), app.delete(), etc....

// runs for every req
// must be at TOP so to run it for every req
app.use(bodyParser.urlencoded({ extended: false }));

// using static serving to serve .css files between vies
app.use(express.static(path.join(rootDir, "public")));

// order fo routes still matter
// exact matching TOP -> lowest matching (all) at BOTTOM

app.use("/shop", shopRoutes);
app.use(indexRoutes);

// fallback page (404 page)
app.use("*", (req, res, next) => {
  res.status(404).render("error-404", {
    pageTitle: "Not Found",
    path: "",
  });
});

// listening for request on port 3000
app.listen(3000);
