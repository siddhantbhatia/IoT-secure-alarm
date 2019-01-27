var Server = require("../Server/Server");
var socket = require("socket.io");

var myServer = new Server();
var serverInstance = myServer.createServer();
myServer.listen();

var io = socket.listen(serverInstance);

var count = 0, start_time;

io.on("connection", function(socket) {
    socket.on("pong_app", function(){
        if (count == 50) {
            end_time = new Date()
            count = 0
            time_taken = end_time - start_time
            avg_time = time_taken / 100
            console.log(avg_time)
            
        } else {
            socket.emit("ping_client");
            count++
        }
    })
    
    start_time = new Date()
    socket.emit("ping_client");
    count++;
})
