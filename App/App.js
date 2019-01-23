var b = require("bonescript");
b.pinMode("P8_19", b.INPUT);
b.pinMode("P8_13", b.OUTPUT);

module.exports = class App {
  constructor() {
    this.counter = 0;
    this.timer = setInterval(readPin, 50);
  }

  readPin() {
    b.digitalRead("P8_19", checkButton);
  }

  checkButton(x) {
    if (x.value == 1) {
      a += 1;
      b.digitalWrite("P8_13", b.HIGH);
      io.emit("gt-button-click", "" + a);
    } else {
      b.digitalWrite("P8_13", b.LOW);
    }
  }
};
