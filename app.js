// creating an express app
const express = require("express");
const app = express();

// working with middleware
// Request -> Middleware -> Response

app.use((req, res, next) => {
  console.log("In 1st middleware");
  // calling next to pass it to next middleware
  next();
});

app.use((req, res, next) => {
  console.log("In 2nd Middleware");
  // now do not want to transfer to next middleware
  // so reuturning some response back to client
  res.send("<h1>Hello From Express</h2>");
});

// listening for request on port 3000
app.listen(3000);
