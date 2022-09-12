const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write(
      '<body><h1>NodeJs File Writer</h1><form action="/message" method="POST"><input type="text" name="messageInput"/><button type="submit">Submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    let msgArr = [];

    req.on("data", (chunk) => {
      msgArr.push(chunk);
    });

    req.on("end", () => {
      const parsedMsg = Buffer.concat(msgArr).toString(); // value in key value pair , eg: input name = input value
      const txtMsg = parsedMsg.split("=")[1]; // split returns array so selecting [1]
      fs.writeFileSync("messages.txt", txtMsg);
    });

    res.statusCode = 302; // wiritng new file status code
    res.setHeader("Location", "/"); // redirecting to index

    return res.end();
  }
});

server.listen(3000);
