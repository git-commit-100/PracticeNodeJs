const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<body><h1>Hi From Node.js</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
