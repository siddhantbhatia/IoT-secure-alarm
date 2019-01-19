var http = require("http"); // include http module
var fs = require("fs");
var path = require("path");

var app = http.createServer(function (req, res) { //create http server
	console.log(req.url);
//	if (req.url == "/") {
		fs.readFile("index.html", function (err, data) {
			res.setHeader("Content-Type", "text/html");
			res.write(data);
			res.end();
		}); 
//	} else if (req.url == "/styles.css") { // serving static css
//		var cssPath = path.join(__dirname, req.url); // location of styles.css
//		var fileStream = fs.createReadStream(cssPath, "UTF-8");
//		res.writeHead(500, {"Content-Type": "text/css"});
//		fileStream.pipe(res);
//	}
}).listen(8080);

// http://127.0.0.1:8080/
//app.listen(8080);

function activateAlarm() {
	document.getElementById("alarm").innerHTML = "ALARMMM!!!";
	console.log("clicked");
	// TODO: send signal to activate LED alarm;
}