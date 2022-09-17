const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  // use sendFile() to return a html file
  res.render("index", {
    pageTitle: "Express Shop",
    path: "/",
  });
});

module.exports = { router };
