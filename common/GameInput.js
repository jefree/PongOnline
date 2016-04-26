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

    var entities = this.getEntitiesWithInput();

    for ( i in entities) {
      var entity = entities[i];
      var inputs = this.inputs.filter(function(input){
        return input.entityId == entity.id && this.shouldApplyInput(input, entity);
      }.bind(this));

      for (j in inputs) {
        var input = inputs[j];
        entity.processInput(input);
        this.inputs.splice(this.inputs.indexOf(input), 1);
      };
    };
  }

  GameInput.prototype.getEntitiesWithInput = function() {
    return this.game.players; //in the server we apply input for all the players
  }

  GameInput.prototype.shouldApplyInput = function(input, entity) {
    return true; // the server always apply the inputs
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

