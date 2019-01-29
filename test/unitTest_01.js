var assert = require("assert");

var server = require("./Server/Server");
var app = require("./App/App");

myServer = new server();
var serverInstance = myServer.createServer();
myServer.listen();

// webpage message listener
var io = require("socket.io").listen(serverInstance);

myApp = new app(io);

module.exports = class Test {
	constructor(app) {
		this.app = app
	}
}
