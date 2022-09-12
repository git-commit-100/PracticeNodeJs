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
    return res.end(); //return keyord to break out of fn
  }

  if (url === "/message" && method === "POST") {
    let msgArr = [];

    req.on("data", (chunk) => {
      msgArr.push(chunk); //pushing data into array then converting to Buffer
    });

    return req.on("end", () => {
      // return keyword here because
      /* req.on() sets an event listener and though at line 35
        return res.end() does not break out because .on() sets
        a listener at later point of time therefore giving header error
      */
      const parsedMsg = Buffer.concat(msgArr).toString(); // value in key value pair , eg: input name = input value
      const txtMsg = parsedMsg.split("=")[1]; // split returns array so selecting [1]
      fs.writeFile("messages.txt", txtMsg, (err) => {
        // writing file asynchronously (writeFileSync uses blocking code)
        if (err) {
          // deal error
        }
        res.statusCode = 302; // wiritng new file status code
        res.setHeader("Location", "/"); // redirecting to index
        return res.end();
      });
    });
  }

  // fallback conent (if url === "/message" only)
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<body><h1>NodeJs File Writer Fallback Page</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
