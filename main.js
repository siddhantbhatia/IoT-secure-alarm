// --- Physical Button Click --- //
// ground team

var b = require("bonescript");
b.pinMode("P8_19", b.INPUT);
b.pinMode("P8_13", b.OUTPUT);

// physical button click listener
var timer = setInterval(check, 50);

function check() {
  b.digitalRead("P8_19", checkButton);
}

function checkButton(x) {
  if (x.value == 1) {
    b.digitalWrite("P8_13", b.HIGH);
  } else {
    b.digitalWrite("P8_13", b.LOW);
  }
}

// --- Server --- //
var http = require("http"); // include http module
var fs = require("fs");
var path = require("path");

var app = http.createServer(function(req, res) {
  //create http server
  console.log(req.url);
  fs.readFile("index.html", function(err, data) {
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.end();
  });
});

app.listen(8888); // webpage port 8888 --> http://beaglebone.local:8888/

// --- Webpage Button Click --- //
// reponse team

// webpage message listener
var io = require("socket.io").listen(app);

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
  socket.on("rs-button-click", function() {
    b.digitalWrite("P8_13", b.HIGH);
    console.log("clicked");
  });
});
