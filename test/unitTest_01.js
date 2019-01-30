var assert = require("assert");
var server = require("./Server/Server");
var app = require("./App/App");

var originalLog = console.log;
var checkLog = "";

console.log = function(str) {
	originalLog(str);
	checkLog += str;
}

myServer = new server();
var serverInstance = myServer.createServer();
myServer.listen();

// webpage message listener
var io = require("socket.io").listen(serverInstance);

myApp = new app(io);

module.exports = class Test {
	constructor(app) {
		this.app = app;
	}
	
	setupTest(clickCounter, holdState) {
		checkLog = "";
		this.app.clickCounter = clickCounter;
		this.app.holdState = holdState;
	}
	
	test_intervalComplete_1click() {
		originalLog("Test: Interval Complete, 1 Click")
		this.setup(1, 10);
		this.app.intervalComplete();
		originalLog(checkLog);
		try {
			assert.equal(checkLog, "clicked = 1")
			originalLog("PASSED.");
		} catch (error) {
			originalLog(error.message);
		}
	}
	
	test_intervalComplete_2click() {
		originalLog("Test: Interval Complete, 2 Clicks")
		this.setup(2, 10);
		this.app.intervalComplete();
		originalLog(checkLog);
		try {
			assert.equal(checkLog, "clicked = 2")
			originalLog("PASSED.");
		} catch (error) {
			originalLog(error.message);
		}
	}
	
	test_intervalComplete_3click() {
		originalLog("Test: Interval Complete, 3 Clicks")
		this.setup(3, 10);
		this.app.intervalComplete();
		originalLog(checkLog);
		try {
			assert.equal(checkLog, "clicked = 3")
			originalLog("PASSED.");
		} catch (error) {
			originalLog(error.message);
		}
	}
	
	test_intervalComplete_hold() {
		originalLog("Test: Interval Complete, Hold")
		this.setup(1, 11);
		this.app.intervalComplete();
		originalLog(checkLog);
		try {
			assert.equal(checkLog, "clicked = 10")
			originalLog("PASSED.");
		} catch (error) {
			originalLog(error.message);
		}
	}
	
	test_intervalComplete_invalid() {
		originalLog("Test: Interval Complete, Invalid")
		this.setup(10, 10);
		this.app.intervalComplete();
		originalLog(checkLog);
		try {
			assert.equal(checkLog, "invalid click: 99999999")
			originalLog("PASSED.");
		} catch (error) {
			originalLog(error.message);
		}
	}
	
	
}
