(function(exports) {
  var TwoPlayersGameLogic = require('../common/TwoPlayersGameLogic').class;

  var ClientTwoPlayersGameLogic = function (width, height) {
    TwoPlayersGameLogic.call(this, width, height);

    this.me = null; // the entity for this player
    this.pendingInputs = [];
    this.gameUpdates = [];
    this.lastGameUpdateId = 0;
  }
  ClientTwoPlayersGameLogic.prototype = Object.create(TwoPlayersGameLogic.prototype);
  ClientTwoPlayersGameLogic.prototype.constructor = ClientTwoPlayersGameLogic;

  // reconciliate the most recent game status, if it isn't
  ClientTwoPlayersGameLogic.prototype.reconciliation = function() {
    var lastGameUpdate = this.getLastGameUpdate();

    if ( lastGameUpdate == null ) {
      return;
    }

    this.updateFromGameUpdate(lastGameUpdate);
    this.processPendingInputsFrom(lastGameUpdate.lastInputId);
  }

  ClientTwoPlayersGameLogic.prototype.processPendingInputsFrom = function(lastInputId) {
     for (var i=this.pendingInputs.length-1; i>=0; i--) {
      var pendingInput = this.pendingInputs[i];
      
      if ( pendingInput.id <= lastInputId ) {
        this.pendingInputs.splice(i, 1);
      }
    }

    for ( index in this.pendingInputs ) {
      var input = this.pendingInputs[index];

      this.me.processInput(input);
      this.me.update();
    }

  }

  ClientTwoPlayersGameLogic.prototype.getLastGameUpdate = function() {
    var lastGameUpdate = null;

    for (index in this.gameUpdates) {
      var gameUpdate = this.gameUpdates[index];

      if ( gameUpdate.id > this.lastGameUpdateId ) {
        lastGameUpdate = gameUpdate;
        this.lastGameUpdateId = lastGameUpdate.id;
      }
    }

    return lastGameUpdate;
  }

  ClientTwoPlayersGameLogic.prototype.updateFromGameUpdate = function(update) {
    var self = this;


    update.entities.forEach(function(entityStatus){
      var localEntity = self.getEntityById(entityStatus.id);

      if (localEntity) {
        localEntity.setStatus(entityStatus);
      }
    });
  }

  exports.class = ClientTwoPlayersGameLogic;

})(typeof exports != "undefined" ? exports : window['ClientTwoPlayersGameLogic']={});
