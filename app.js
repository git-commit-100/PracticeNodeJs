// creating an express app
const express = require("express");
const app = express();
const path = require("path");

const rootDir = require("./utils/path");

// importing body-parser
const bodyParser = require("body-parser");

// importing routes
const indexRoutes = require("./routes/index");
const shopRoutes = require("./routes/shop");

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
  res.status(404).sendFile(path.join(rootDir, "views", "error404.html"));
});

// listening for request on port 3000
app.listen(3000);
