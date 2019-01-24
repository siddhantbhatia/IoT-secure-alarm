var Command = require("./Command");

module.exports = class CommandManager {
  constructor() {
    this.commandHashMap = new Map();
    this.initiliazeCommandHashMap();
  }

  initiliazeCommandHashMap() {
    this.addCommand(1);
    this.addCommand(2);
    this.addCommand(3);
    this.addCommand(10);
  }

  addCommand(numberOfClicks) {
    var newCommand = new Command(numberOfClicks);
    this.commandHashMap.set(numberOfClicks, newCommand);
  }

  deleteCommand(numberOfClicks) {
    this.commandHashMap.delete(numberOfClicks);
  }
};
