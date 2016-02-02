(function(exports) {
  // this is just to test the functionality of require in the client side
  var InputController = require("client/InputController");
  
  var KeyboardController = function(game) {
    InputController.class.call(this, game);
  }

  KeyboardController.prototype = Object.create(InputController.class.prototype);
  KeyboardController.prototype.constructor = KeyboardController;

  KeyboardController.prototype.createInputListener = function() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  KeyboardController.prototype.onKeyDown = function(evt) {
    switch (evt.keyCode) {
      case Constants.key.RIGHT:
      case Constants.key.LEFT:
        this.setInputStatus(evt.keyCode, true);
        break;
    }
  }

  KeyboardController.prototype.onKeyUp = function(evt) {
    switch (evt.keyCode) {
      case Constants.key.RIGHT:
      case Constants.key.LEFT:
        this.setInputStatus(evt.keyCode, false);
        break;
    }
  }

  exports.class = KeyboardController;

})(typeof exports !== "undefined" ? exports : window["KeyboardController"]=[]);
