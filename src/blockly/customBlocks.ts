import * as Blockly from "blockly";

export function registerCustomBlocks() {
  Blockly.Blocks["go_straight"] = {
    init: function () {
      this.appendDummyInput().appendField("go straight");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#5ba55b");
    },
  };

  Blockly.Blocks["turn_left"] = {
    init: function () {
      this.appendDummyInput().appendField("turn left");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#5ba55b");
    },
  };

  Blockly.Blocks["turn_right"] = {
    init: function () {
      this.appendDummyInput().appendField("turn right");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#5ba55b");
    },
  };
}