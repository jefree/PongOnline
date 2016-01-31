(function(exports) {
  
  var GameInput = function(game) {
    this.game = game;
    this.inputs = [];
    this.currentId = 1;
  }

  GameInput.prototype.update = function() {
    for (var i=this.game.entities.length-1; i>=0; i--) {
      var entity = this.game.entities[i];

      for (var j=this.inputs.length-1; j>=0; j--) {
        var input = this.inputs[j];

        if (input.entityId == entity.id) {
          //apply and remove it
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
  }

  exports.class = GameInput;
})(typeof exports !== 'undefined' ? exports : window['GameInput']={});

