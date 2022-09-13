const http = require("http");

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

const server = http.createServer(app);

server.listen(3000);
