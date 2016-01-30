(function(exports) {
  
  var GameInput = function(game) {
    this.game = game;
    this.inputs = [];
  }

  GameInput.prototype.update = function() {
  }

  exports.new = GameInput;
})(typeof exports !== 'undefined' ? exports : window['GameInput']={});

