// var http = require("http"); // include http module
// var fs = require("fs");
// var path = require("path");
// var io = require("socket.io")();

// var app = http.createServer(function(req, res) {
//   //create http server
//   //	if (req.url == "/") {
//   fs.readFile("index.html", function(err, data) {
//     res.setHeader("Content-Type", "text/html");
//     res.write(data);
//     res.end();
//   });
//   //	} else if (req.url == "/styles.css") { // serving static css
//   //		var cssPath = path.join(__dirname, req.url); // location of styles.css
//   //		var fileStream = fs.createReadStream(cssPath, "UTF-8");
//   //		res.writeHead(500, {"Content-Type": "text/css"});
//   //		fileStream.pipe(res);
//   //	}
// });

// io.on("connection", function(socket) {
//   console.log("a user connected");
// });

// app.listen(3000, "0.0.0.0", function() {
//   console.log("listening on *:3000");
// });

// function activateAlarm() {
//   document.getElementById("alarm").innerHTML = "ALARMMM!!!";
//   console.log("clicked");
//   // TODO: send signal to activate LED alarm;
// }

// var app = require("express")();
// var http = require("http").Server(app);
// var io = require("socket.io")(http);

// button click code 
var b = require('bonescript');
b.pinMode('P8_19', b.INPUT);
b.pinMode('P8_13', b.OUTPUT);

function check(){
  b.digitalRead('P8_19', checkButton);
  
}
function checkButton(x) {
  if(x.value == 1){
    b.digitalWrite('P8_13', b.HIGH);
  }
  else{
    b.digitalWrite('P8_13', b.LOW);
  }
}

// for http module
var http = require("http"); // include http module
var fs = require("fs");
var path = require("path");

var app = http.createServer(function (req, res) { //create http server
	console.log(req.url);
	fs.readFile("index.html", function (err, data) {
			res.setHeader("Content-Type", "text/html");
			res.write(data);
			res.end();
		  
		});
});

app.listen(8888);

// socket.io connection

var io = require('socket.io').listen(app);

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
  socket.on("button clicked", function() {
      b.digitalWrite('P8_13', b.HIGH);
    console.log("clicked");
  });
});


