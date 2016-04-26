(function(exports) {
  var GameInput = require("../common/GameInput").class;
  var Constants = require("../common/Constants");

  var ClientGameInput = function(game) {
    GameInput.call(this, game);
  }

  ClientGameInput.prototype = Object.create(GameInput.prototype);
  ClientGameInput.prototype.constructor = ClientGameInput;

  ClientGameInput.prototype.shouldApplyInput = function(input, entity) {
    return input.time + (Constants.game.inputClientDelay / 1000) <= this.game.time;
  }

  ClientGameInput.prototype.getEntitiesWithInput = function() {
    return [this.game.me];
  }

  exports.class = ClientGameInput;
})(typeof exports !== 'undefined' ? exports : window['ClientGameInput']={});
