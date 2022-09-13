const http = require("http");

const routes = require("./routes");

const { requestHandler } = routes;

const server = http.createServer(requestHandler);

server.listen(3000);
