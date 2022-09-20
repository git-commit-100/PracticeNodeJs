const get404 = (req, res, next) => {
  res.status(404).render("not-found", {
    pageTitle: "Error 404 Not Found",
    path: "",
  });
};

module.exports = {
  get404,
};
