var b = require("bonescript");
b.pinMode("P8_19", b.INPUT); // set P8_19 (connected to button) as input
b.pinMode("P8_13", b.OUTPUT); // set P8_13 (connected to LED) as output
var CommandManager = require("./Command/CommandManager");
var Click = require("./Command/Click");
var Command = require("./Command/Command");

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

// -- Class

module.exports = class App {
  constructor() {
    this.counter = 0;

    console.log("entered app");

    this.CommandManager = CommandManagerSingleton.getInstance();

    this.clickCounter = 0; // number of clicks
    this.firstClick = false;
    this.prevButtonState = 0; // immediate previous state read from button
    this.holdState = 0; // number of intervals the button is hold

    this.initializeInputListener();
  }

  initializeInputListener() {
    var self = this;

    // set the interval to poll for  hardware input
    this.timer = setInterval(function() {
      //callback method
      b.digitalRead("P8_19", function(x) {
        self.readPin(self, x);
      });
    }, 50);
  }

  /**
   * @description Reads the Beaglebone hardware pin for input
   */
  readPin(self, x) {
    if (x.value == 1) {
      this.holdState += 1;

      if (self.firstClick == false) {
        setTimeout(function() {
          self.intervalComplete(self);
        }, 2000); // Initiate the 5 second timer to detect the signal
        self.firstClick = true;
      }

      /**
       * Implemented previous state logic To align the human beaviour/speed and hardware response.
       * this avoids loss of event register and false positives.
       */
      if (self.prevButtonState != 1) {
        self.clickCounter += 1;
        self.prevButtonState = 1;
        console.log("clicked");
      }
    } else {
      self.prevButtonState = 0;
    }
  }

  /**
   * @description Output the type of click in terminal (To be run every 5sec)
   */
  intervalComplete(self) {
    console.log("entered callback");
    if (self.clickCounter == 1 && self.holdState > 10) {
      self.clickCounter = 10;
    }

    if (self.CommandManager.checkCommand(self.clickCounter)) {
      console.log("clicked: " + self.clickCounter);
    } else {
      console.log("invalid click: " + self.clickCounter);
    }

    // reset all variables
    self.clickCounter = 0;
    self.firstClick = false;
    self.prevButtonState = 0;
    self.holdState = 0;

    // // if number of clicks is 1 and button is hold for 10 of the checking intervals
    // if (clickCounter == 1 && holdState > 10) {
    //   console.log("hold"); // output to terminal as a hold
    //   b.digitalWrite("P8_13", b.HIGH); // LED on
    //   console.log("on");
    //   wait_ms(1500); // let LED on for 2 sec
    //   b.digitalWrite("P8_13", b.LOW); // LED off
    //   console.log("off");
    // } else {
    //   console.log(clickCounter + " click(s)"); // else output to terminal the number of clicks
    //   blink(clickCounter); // let LED blink for the number of times the button is clicked in the 5sec
    // }
  }
};
