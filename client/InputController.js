(function(exports) {
  var InputController =  function(game) {
    this.game = game;
    this.gameInput = new GameInput.class(this.game);

    // store the inputs for each registered player
    this.entityInputMap = {};

    //override by subclasses
    this.createInputListener();

    // already registered input codes
    this.availableInputCodes = [];
  }

  InputController.prototype.addEntityInput = function(entityId, inputCode, actionName) {
    var entityInputs = null;

    if ( this.availableInputCodes.indexOf(inputCode) == -1 ) {
      this.availableInputCodes.push(inputCode);
    }

    if ( this.entityInputMap.hasOwnProperty(entityId) ) {
      entityInputs = this.entityInputMap[entityId];
    }
    else {
      entityInputs = this.entityInputMap[entityId] = {};
    }

    entityInputs[inputCode] = { 
      action: actionName,
      status: false
    };
  }

  InputController.prototype.update = function() {
    for ( entityId in this.entityInputMap ) {
      var inputSet = {};

      // register each of the pressed inputs for this player
      for ( inputCode in this.entityInputMap[entityId] ) {
        var input = this.entityInputMap[entityId][inputCode];
        
        // crate the input only if the input is activated
        if ( input.active ) {
          inputSet[input.action] = true;
        }
      }

      if ( Object.keys(inputSet).length > 0) {
        this.gameInput.addInput(entityId, inputSet, this.game.time);
      }
    }

    this.gameInput.update();
  }

  InputController.prototype.setInputStatus = function(inputCode, status) {
    if ( this.availableInputCodes.indexOf(inputCode) == -1 ) {
      return
    }

    for ( entityId in this.entityInputMap ) {
      if ( this.entityInputMap[entityId].hasOwnProperty(inputCode) ) {
        this.entityInputMap[entityId][inputCode].active = status;
      }
    }
  }

  InputController.prototype.createInputListener = function() {
    // mustbe override by subclasses
  }

  exports.class = InputController;

})(typeof exports !== "undefined" ? exports : window["InputController"]={});

