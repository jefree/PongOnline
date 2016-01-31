(function(exports) {
  
  var GameInput = function(game) {
    this.game = game;
    this.inputs = [];
  }

  GameInput.prototype.update = function() {
  }

  GameInput.prototype.addInput = function(playerId, input) {
//    var input = Util.clone(input);
//    input.id = currentId++;
//    input.playerId = id;
  }

  exports.class = GameInput;
})(typeof exports !== 'undefined' ? exports : window['GameInput']={});

