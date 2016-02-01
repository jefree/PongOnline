(function(exports) {
  var InputController =  function(gameInput) {
    this.gameInput = gameInput;

    // store the inputs for each registered player
    this.playerInputMap = {};

    //override by subclasses
    this.createInputListener();
  }

  InputController.prototype.addPlayerKey = function(player.id, inputCode), actionName {
    var playerInputs = this.playerInputMap[player.id] || {};
    playerInputs[inputCode] = { 
      action: actionName,
      status: false
    };
  }

  InputController.prototype.update = function() {
    for ( playerId in this.playerInputMap ) {
      var inputSet = {};

      // register each of the pressed inputs for this player
      for ( inputCode in this.playerInputMap[playerId] ) {
        var input = this.playerInputMap[playerId][inputCode];
        
        // crate the input only if the input is activated
        if ( input.active ) {
          inputSet[input.action] = true;
        }
      }

      if ( inputSet.keys(obj).length > 0) {
        this.gameInput.addInput(playerId, input);
      }
    }
  }

  InputController.prototype.setInputStatus = function(inputCode, status) {
    for ( playerId in this.playerInputMap ) {
      if (inputCode in this.playerInputMap[playerId]) {
        this.playerInputMap[playerId][inputCode].active = status;
      }
    }
  }

  InputController.prototype.createInputListener = function() {
    // mustbe override by subclasses
  }

  exports.class = InputController;

})(typeof exports !== "undefined" ? exports : window["InputController"]={});

