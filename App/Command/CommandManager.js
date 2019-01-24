var Command = require("./Command");

module.exports = class CommandManager {
  constructor() {
    this.commandHashMap = new Map();
    this.initiliazeCommandHashMap();
  }

  /**
   * @description Initiliazes the hard coded command hash map
   */
  initiliazeCommandHashMap() {
    this.addCommand(1);
    this.addCommand(2);
    this.addCommand(3);
    this.addCommand(10);
  }

  /**
   * @description adds a new command to the hash map
   * @param numberOfClicks number of Click objects in the Command Object
   */
  addCommand(numberOfClicks) {
    var newCommand = new Command(numberOfClicks);
    this.commandHashMap.set(numberOfClicks, newCommand);
  }

  /**
   * @description delete command from hash map
   * @param {number of Click objects in the Command Object} numberOfClicks
   */
  deleteCommand(numberOfClicks) {
    this.commandHashMap.delete(numberOfClicks);
  }

  /**
   * @description checks if a command with numberOfClicks exists
   * @param {number of Click objects in the Command Object} numberOfClicks
   */
  checkCommand(numberOfClicks) {
    return this.commandHashMap.get(numberOfClicks);
  }
};
