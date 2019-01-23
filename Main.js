var server = require("./Server");
var app = require("./App/App");

myServer = new server();
myServer.createServer();
myServer.listen();
