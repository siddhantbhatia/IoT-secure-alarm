var assert = require("assert");
var b = require("bonescript");
var server = require("../Server/Server");
var app = require("../App/App");

/**
 * Replace the console.log function to save printed string into a var.
 */
var originalLog = console.log;
var checkLog = "";
console.log = function(str) {
	originalLog(str);
	checkLog += str;
}

/**
 * Setting up the server and app.
 */
myServer = new server();
var serverInstance = myServer.createServer();
myServer.listen();

// webpage message listener
var io = require("socket.io").listen(serverInstance);

myApp = new app(io);


/**
 * Class to test methods in App class.
 */
class Test {
	constructor(app) {
		this.app = app;
	}
	
	
	/**
	 * To setup the click counter and hold state.
	 */
	setupTest(clickCounter, holdState) {
		checkLog = "";
		this.app.clickCounter = clickCounter;
		this.app.holdState = holdState;
	}
	
	
	/**
	 * To test the method intervalComplete with different clicks.
	 */
	test_intervalComplete() {
		originalLog("Test: intervalComplete")
		var setupSet = [[1, 10], [2, 10], [3, 10], [1, 11], [4, 9], [10, 9]];
		for (var i = 0; i < setupSet.length; i++) {
			this.setupTest(setupSet[i][0], setupSet[i][1]);
			this.app.intervalComplete(this.app);
// 			originalLog(checkLog);//
			var str1 = "entered callbackclicked: " + setupSet[i][0];
			if (i == 3) {
			    str1 = "entered callbackclicked: 10";
			} else if (i == 4) {
				str1 = "entered callbackinvalid click: " + setupSet[i][0];
			} else if (i == 5) {
				str1 = "entered callbackinvalid click: 99999999";
			}
			try {
				assert.equal(checkLog, str1);
				originalLog("PASSED.");
			} catch (error) {
				originalLog(error.message);
				originalLog("FAILED.");
			}
		}
	}
	

	/**
	 * To test the method blinkLed with different types of blink.
	 * Automate the blink (Verify by eyes)
	 */
	test_blinkLed() {
		originalLog("Test: blinkLed")
		var ledCode = ["P8_13", "USR1", "USR3"];
		for (var i = 0; i < ledCode.length; i++) {
			this.test_blinkLed_help(ledCode[i]);
		}
	}
	
	test_blinkLed_help(ledCode) {
	    originalLog(ledCode);
	    for (var i = 1; i < 4; i++) {
	        originalLog(i);
	        this.app.occupiedState = true;
	        var blinkTimer = this.app.blinkLed(this.app, ledCode, i);
	        this.app.resetState(this.app, blinkTimer);
// 	        if (!blinkTimer) {
// 	            this.app.intervalTimer(500);
// 				b.digitalWrite(ledCode, 0);
// 			    this.app.intervalTimer(500);
// 			} else {
// 			    setTimeout(function() {
//                     clearInterval(blinkTimer);
//                     b.digitalWrite(ledCode, 0);
//                     originalLog(this.app.occupiedState);
//                 }, 5000);
// 			}
	    }
	}
}

var myTest = new Test(myApp);
// myTest.test_intervalComplete();
myTest.test_blinkLed();