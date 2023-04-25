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
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");

// using templating engine
app.set("view engine", "ejs");
app.set("views", "views");

// to parse all requests
app.use(bodyParser.urlencoded({ extended: false }));

// static serving to .css files
app.use(express.static(path.join(rootDir, "public")));

// registering an extra middleware to pass model obj in req
app.use("/", (req, res, next) => {
  User.findOne({ where: { id: 1 } })
    .then((user) => {
      // passing user to req obj
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// ROUTES
app.use("/shop", shopRouter);
app.use("/admin", adminRouter);

// default route
app.get("/", (req, res, next) => {
  res.redirect("/shop");
});

// fallback page
app.use("*", get404);

/* 
db associations
User (1) -> Orders (Many) / Products (Many)
*/

Product.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.hasMany(Product);

// creating a table in db
sequelize
  //-> to apply changes forcefully to db
  // .sync({ force: true })
  .sync()
  .then(() => {
    // creating a dummy User if not found one
    return User.findOne({ where: { id: 1 } });
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Bhargav",
        email: "bhargav@shoppy.com",
      });
    } else {
      return user;
    }
  })
  .then((user) => {
    app.listen(3000);
    console.log("\nConnected to db successfully 🟢 \n");
  })
  .catch((err) => console.log(err));
