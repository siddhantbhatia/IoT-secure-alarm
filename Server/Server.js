// --- Server --- //
var http = require("http");
var fs = require("fs");
var path = require("path");
// var socketio = require("socket.io");

module.exports = class Server {
  constructor() {
    // this.io = new socketio();
  }

  /**
   * @description Initializes the server
   */
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

    return this.app;
  }

  /**
   * @description Initializes event listener
   */
  listen() {
    if (this.app != null) {
      console.log("not null");
      this.app.listen(8888, "0.0.0.0"); // webpage port 8888 --> http://beaglebone.local:8888/
    } else {
      console.log("");
    }
  }
};
