var Server = require("../Server/Server");
var socket = require("socket.io");

var myServer = new Server();
var serverInstance = myServer.createServer();
myServer.listen();

var io = socket.listen(serverInstance); //same as Main.js inintialisation

var count = 0, start_time; 

io.on("connection", function(socket) {
    //makes the app and server emit 50 times and so dividing by 100 will be the time of a ping 
    socket.on("pong_app", function(){
        if (count == 50) { //keep track till ping 50 times
            end_time = new Date() 
            count = 0
            time_taken = end_time - start_time
            avg_time = time_taken / 100   //calculation of the ping
            console.log("latency is "+avg_time +"ms") //printing it out 
            
        } else {
            socket.emit("ping_client");
            count++
        }
    })
    
    start_time = new Date() //start timer
    socket.emit("ping_client");
    count++; 
})
