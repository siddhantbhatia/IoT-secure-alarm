var Server = require("../Server/Server");
var socket = require("socket.io");

var myServer = new Server();
var serverInstance = myServer.createServer();
myServer.listen();

var io = socket.listen(serverInstance);

var count = 0, start_time;

io.on("connection", function(socket) {
    console.log("connected")
})
