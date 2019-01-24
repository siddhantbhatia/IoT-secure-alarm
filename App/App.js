var b = require("bonescript");
b.pinMode("P8_19", b.INPUT); // set P8_19 (connected to button) as input
b.pinMode("P8_13", b.OUTPUT); // set P8_13 (connected to LED) as output

var CommandManager = require("./Command/CommandManager");

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

module.exports = class App {
  constructor() {
    this.counter = 0;
    this.timer = setInterval(this.readPin, 50);
    console.log("entered app");

    this.CommandManager = CommandManagerSingleton.getInstance();
  }

  readPin() {
    b.digitalRead("P8_19", function(x) {
      if (x.value == 1) {
        b.digitalWrite("P8_13", b.HIGH);
        console.log("button press");
      } else {
        b.digitalWrite("P8_13", b.LOW);
        console.log("button no press");
      }
    });
    console.log("check");
  }
};
