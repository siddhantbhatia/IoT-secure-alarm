var http = require("http"); // include http module

http.createServer(function (req, res) { //create http server
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end("Hello World");
}).listen(8080);

function activateAlarm() {
	document.getElementById("alarm").innerHTML = "ALARMMM!!!";
	// TODO: send signal to activate LED alarm;
}