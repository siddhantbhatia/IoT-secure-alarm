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
};

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
   * Test functionality of every required LED to ensure the hardware connection is correct
   */
  test_ledFunctioning() {
    originalLog("\nTest: Led Functioning");
    originalLog("Manual Inspection as relies on Hardware");
    this.app.intervalTimer(1000);

    var ledCode = ["P8_13", "USR1", "USR3"];
    for (var i = 0; i < ledCode.length; i++) {
      originalLog("Lighting " + ledCode[i] + " in 2 seconds...");
      this.app.intervalTimer(2000);
      this.app.blinkLed(this.app, ledCode[i], 1);
      originalLog("ON");
      this.app.intervalTimer(3000);
      b.digitalWrite(ledCode[i], 0);
    }
  }

  /**
   * Test functionality of button click to ensure the hardware connection is correct
   */
  test_buttonFunctioning() {
    originalLog("\nTest: Button Functioning");
    originalLog("Manual Inspection as relies on Hardware");
    this.app.intervalTimer(1000);

    originalLog("Press the button within  3 seconds");

    var clicked = false;
    var timer = setInterval(function() {
      b.digitalRead("P8_19", function(x) {
        if (x.value == 1) {
          b.digitalWrite("P8_13", b.HIGH);
          clicked = true;
          clearInterval(timer);
        } else {
          b.digitalWrite("P8_13", b.LOW);
        }
      });
    }, 50);

    var timeout = setTimeout(() => {
      if (clicked) {
        originalLog("PASSED");
        b.digitalWrite("P8_13", b.LOW);
      } else {
        originalLog("FAILED");
      }
    }, 3000);
  }

  /**
   * To test the method intervalComplete with different clicks.
   */
  test_intervalComplete() {
    originalLog("\nTest: intervalComplete");
    originalLog("Automatic input");
    var setupSet = [
      [1, 1],
      [2, 6],
      [3, 8],
      [1, 10],
      [1, 11],
      [4, 9],
      [5, 10],
      [10, 10]
    ];
    for (var i = 0; i < setupSet.length; i++) {
      this.setupTest(setupSet[i][0], setupSet[i][1]);
      this.app.intervalComplete(this.app);

      var str1 = "clicked: " + setupSet[i][0];
      if (i == 3 || i == 4) {
        str1 = "clicked: 10";
      } else if (i == 5) {
        str1 = "invalid click: " + setupSet[i][0];
      } else if (i >= 6) {
        str1 = "invalid click: 99999999";
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
    originalLog("\nTest: blinkLed on LED P8_13");
    originalLog("Manual Inspection as relies on Hardware");

    originalLog("-- Blink once");
    this.app.blinkLed(this.app, "P8_13", 1);
    this.app.intervalTimer(1000);
    b.digitalWrite("P8_13", 0);

    this.app.intervalTimer(1000);
    originalLog("-- Blink twice");
    this.app.blinkLed(this.app, "P8_13", 2);
    this.app.intervalTimer(1000);
    this.app.intervalTimer(1000);

    originalLog("-- Blink rapid (3 seconds)");
    this.app.intervalTimer(500);
    var blinkInterval = this.app.blinkLed(this.app, "P8_13", 3);
    this.app.resetState(this.app, blinkInterval, 3000);

    // allows the async timeout method to run in the call stack
    this.app.intervalTimer(50);
    this.app.intervalTimer(50);
    this.app.intervalTimer(50);
    this.app.intervalTimer(50);
    this.app.intervalTimer(50);
    this.app.intervalTimer(50);
    this.app.intervalTimer(50);
    this.app.intervalTimer(50);
  }

  //   test_communicationConnection() {
  //     io.emit("rt-sound-alarm", 5);
  //     try {
  //       assert.equal(checkLog, "sound-alarm 5");
  //       originalLog("PASSED.");
  //     } catch (error) {
  //       originalLog(error.message);
  //       originalLog("FAILED.");
  //     }

  //     io.emit("rt-sound-alarm", 60);
  //     try {
  //       assert.equal(checkLog, "sound-alarm 5");
  //       originalLog("PASSED.");
  //     } catch (error) {
  //       originalLog(error.message);
  //       originalLog("FAILED.");
  //     }

  //     io.emit("rt-stop-alarm");
  //     try {
  //       assert.equal(checkLog, "stop-alarm");
  //       originalLog("PASSED.");
  //     } catch (error) {
  //       originalLog(error.message);
  //       originalLog("FAILED.");
  //     }

  //     io.emit("rt-lock-register");
  //     try {
  //       assert.equal(checkLog, "lock-register");
  //       originalLog("PASSED.");
  //     } catch (error) {
  //       originalLog(error.message);
  //       originalLog("FAILED.");
  //     }

  //     io.emit("rt-decline");
  //     try {
  //       assert.equal(checkLog, "decline");
  //       originalLog("PASSED.");
  //     } catch (error) {
  //       originalLog(error.message);
  //       originalLog("FAILED.");
  //     }
  //   }
}

var myTest = new Test(myApp);
myTest.test_ledFunctioning();
myTest.test_intervalComplete();
myTest.test_blinkLed();
myTest.test_buttonFunctioning();
// myTest.test_communicationConnection();
