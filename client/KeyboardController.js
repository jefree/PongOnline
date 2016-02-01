(function(exports) {
  // this is just to test the functionality of require in the client side
  var InputController = require("client/InputController");
  
  var KeyboardController = function(gameInput) {
    InputController.class.call(this, gameInput);
  }

  KeyboardController.prototype = Object.create(InputController.class.prototype);
  KeyboardController.prototype.constructor = KeyboardController;

  KeyboardController.prototype.createInputListener = function {
  }

  exports.class = KeyboardController;

})(typeof exports !== "undefined" ? exports : window["KeyboardController"]=[]);
