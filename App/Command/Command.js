var Click = require("./Click");

module.exports = class Command {
  constructor(numberOfClicks) {
    this.clickArray = [];
    this.initialiseCommandArray(numberOfClicks);
  }

  initialiseCommandArray(numberOfClicks) {
    for (var i = 1; i <= numberOfClicks; i++) {
      var click = new Click();
      this.clickArray.push(click);
    }
  }

  getCount() {
    return this.clickArray.length;
  }
};
