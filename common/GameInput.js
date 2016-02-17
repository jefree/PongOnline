(function(exports) {
  var Util = require('./Util');

  var GameInput = function(game) {
    this.game = game;
    this.inputs = [];
    this.listeners = {};
    this.currentId = 1;
    this.applyInputs = true;
  }

  GameInput.prototype.update = function() {
    if ( !this.applyInputs ) {
      this.inputs.length = 0;
      return;
    }

    for (var i=this.game.entities.length-1; i>=0; i--) {
      var entity = this.game.entities[i];

      for (var j=this.inputs.length-1; j>=0; j--) {
        var input = this.inputs[j];

        if (input.entityId == entity.id) {
          entity.processInput(input);
          this.inputs.splice(j, 1);
        }
      }
    }
  }

  GameInput.prototype.addInput = function(id, input) {
    var input = Util.clone(input);

    input.id = this.currentId++;
    input.entityId = id;

    this.inputs.push(input);

    // execute all registered listener functions
    for ( name in this.listeners) {
      this.listeners[name].call(null, input);
    }
  }

  GameInput.prototype.addListener = function(name, callback) {
    this.listeners[name] = callback;
  }

  exports.class = GameInput;
})(typeof exports !== 'undefined' ? exports : window['GameInput']={});

