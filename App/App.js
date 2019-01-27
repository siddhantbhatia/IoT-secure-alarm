var b = require("bonescript");
var CommandManager = require("./Command/CommandManager");

b.pinMode("P8_19", b.INPUT); // set P8_19 (connected to button) as input
b.pinMode("P8_13", b.OUTPUT); // set P8_13 (connected to LED) as output

// -- to ensure that a single instance of command manager is created
var CommandManagerSingleton = (function() {
  var instance;

  function createInstance() {
    var object = new CommandManager();
    return object;
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

var blinkTypes = { single: 1, double: 2, rapid: 3 };
Object.freeze(blinkTypes);

var ledEnum = { signal: "P8_13", acknowledgment: "USR1", state: "USR3" };
Object.freeze(ledEnum);

// -- Class

module.exports = class App {
  constructor(io) {
    this.io = io;
    this.counter = 0;

    console.log("entered app");

    this.CommandManager = CommandManagerSingleton.getInstance();

    this.clickCounter = 0; // number of clicks
    this.firstClick = false;
    this.prevButtonState = 0; // immediate previous state read from button
    this.holdState = 0; // number of intervals the button is hold

    this.initHardwareInputListener();
    this.initClientMessageListener();
    this.initInputCommands();

    b.digitalWrite("USR0", 0);
    b.digitalWrite("USR1", 0);
    b.digitalWrite("USR2", 0);
    b.digitalWrite("USR3", 0);

    this.occupiedState = false;
  }

  /**
   * @description sets the interval to poll for  hardware input
   */
  initHardwareInputListener() {
    var self = this;

    this.timer = setInterval(function() {
      b.digitalRead("P8_19", function(x) {
        self.readPin(self, x);
      });
    }, 50);
  }

  /**
   * @description Establishes socket-io listener to listen for client events
   */
  initClientMessageListener() {
    var self = this;

    this.io.on("connection", function(socket) {
      console.log("a user connected");
      socket.on("disconnect", function() {
        console.log("user disconnected");
      });

      // rs -- response team
      socket.on("rt-sound-alarm", function() {
        console.log("alarm");
        var blinkTimer = self.blinkLed(self, ledEnum.signal, blinkTypes.rapid);
        self.blinkLed(self, ledEnum.acknowledgment, blinkTypes.single);
        self.resetState(self, blinkTimer);
      });

      socket.on("rt-lock-register", function() {
        console.log("lock register");
        self.blinkLed(self, ledEnum.signal, blinkTypes.single);
        self.blinkLed(self, ledEnum.acknowledgment, blinkTypes.single);
        self.resetState(self, false);
      });

      socket.on("rt-decline", function() {
        console.log("decline");
        self.blinkLed(self, ledEnum.acknowledgment, blinkTypes.double);
        self.resetState(self, false);
      });
    });
  }

  /**
   * @description Initiliazes the types of command for command manager
   */
  initInputCommands() {
    this.CommandManager.addCommand(1);
    this.CommandManager.addCommand(2);
    this.CommandManager.addCommand(3);
    this.CommandManager.addCommand(10);
  }

  /**
   * @description Reads the Beaglebone hardware pin for input
   * @param {reference to the calling class} self
   * @param {input value from the hardware pin} x
   */
  readPin(self, x) {
    if (x.value == 1) {
      if (self.occupiedState == false) {
        this.holdState += 1;

        if (self.firstClick == false) {
          setTimeout(function() {
            self.intervalComplete(self);
          }, 2000); // Initiate the 5 second timer to detect the signal
          self.firstClick = true;
        }

        /**
         * Implemented previous state logic To align the human behaviour/speed and hardware response.
         * this avoids loss of event register and false positives.
         */
        if (self.prevButtonState != 1) {
          self.clickCounter += 1;
          self.prevButtonState = 1;
          console.log("clicked");
        }
      } else {
        self.blinkLed(self, ledEnum.state, blinkTypes.double);
      }
    } else {
      self.prevButtonState = 0;
    }
  }

  /**
   * @description Checks the number of click within the interval and resets all values
   * @param {reference to the calling class} self
   */
  intervalComplete(self) {
    console.log("entered callback");
    if (self.clickCounter == 1 && self.holdState > 10) {
      self.clickCounter = 10;
    }

    if (self.clickCounter == 10 && !(self.holdState >= 10)) {
      self.clickCounter = 99999999;
    }

    if (self.CommandManager.checkCommand(self.clickCounter)) {
      console.log("clicked: " + self.clickCounter);
      self.io.emit("gt-button-click", "" + self.clickCounter);
      self.occupiedState = true;
    } else {
      console.log("invalid click: " + self.clickCounter);
    }

    self.clickCounter = 0;
    self.firstClick = false;
    self.prevButtonState = 0;
    self.holdState = 0;
  }

  /**
   * @description Turns on the ledNumber with blinkType
   * @param {reference to this class instance} self
   * @param {refers to the physical led on the BBB board} ledNumber
   * @param {type of blink} blinkType
   */
  blinkLed(self, ledNumber, blinkType) {
    switch (blinkType) {
      case blinkTypes.single:
        b.digitalWrite(ledNumber, 1);
        break;
      case blinkTypes.double:
        for (var i = 0; i < 2; i++) {
          b.digitalWrite(ledNumber, 1);
          self.intervalTimer(200);
          b.digitalWrite(ledNumber, 0);
          self.intervalTimer(200);
        }
        break;
      case blinkTypes.rapid:
        var blinkTimer = setInterval(function() {
          b.digitalWrite(ledNumber, 1);
          self.intervalTimer(50);
          b.digitalWrite(ledNumber, 0);
          self.intervalTimer(50);
        }, 110);

        return blinkTimer;
      default:
        break;
    }
  }

  resetState(self, blinkTimer) {
    setTimeout(function() {
      if (blinkTimer) {
        clearInterval(blinkTimer);
      }

      b.digitalWrite(ledEnum.acknowledgment, 0);
      b.digitalWrite(ledEnum.signal, 0);
      self.occupiedState = false;
    }, 5000);
  }

  /**
   * @description tracks time to perform action after an interval in the same thread
   * @param {second interval} ms
   */
  intervalTimer(ms) {
    var start = new Date().getTime(); // get initial time
    var end = new Date().getTime(); // initialise end time
    while (end < start + ms) {
      // let this loop run for the number of ms specified
      end = new Date().getTime(); // getting new current time
    }
  }
};
