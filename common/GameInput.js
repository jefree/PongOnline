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

      var inputs = this.inputs.filter(function(input){
        return input.entityId == entity.id
      });

      for (var j=0; j<inputs.length; j++) {
        var input = inputs[j];

        if (!this.game.isClient || input.time + 0.2 <= this.game.time) {
          entity.processInput(input);
          this.inputs.splice(this.inputs.indexOf(input), 1);
        }
      }
    }
  }

  GameInput.prototype.addInput = function(id, input, time) {
    var input = Util.clone(input);

    input.id = this.currentId++;
    input.entityId = id;
    input.time = time;

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

