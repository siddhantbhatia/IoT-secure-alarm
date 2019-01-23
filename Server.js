// --- Server --- //
var http = require("http");
var fs = require("fs");
var path = require("path");

module.exports = class Server {
  constructor() {}

  createServer() {
    this.app = http.createServer(function(req, res) {
      //create http server
      console.log(req.url);
      fs.readFile("index.html", function(err, data) {
        res.setHeader("Content-Type", "text/html");
        res.write(data);
        res.end();
      });
    });
  }

  listen() {
    if (this.app != null) {
      this.app.listen(8888); // webpage port 8888 --> http://beaglebone.local:8888/
    } else {
      console.log("");
    }
  }
};
