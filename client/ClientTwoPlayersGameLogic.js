(function(exports) {
  var TwoPlayersGameLogic = require('../common/TwoPlayersGameLogic').class;
  var Util = require('../common/Util');

  var ClientTwoPlayersGameLogic = function (width, height) {
    TwoPlayersGameLogic.call(this, width, height);

    this.me = null; // the entity for this player
    this.pendingInputs = [];
    this.gameUpdates = [];
    this.lastGameUpdateId = 0;
  }
  ClientTwoPlayersGameLogic.prototype = Object.create(TwoPlayersGameLogic.prototype);
  ClientTwoPlayersGameLogic.prototype.constructor = ClientTwoPlayersGameLogic;

  ClientTwoPlayersGameLogic.prototype.update = function(delta) {
    this.reconciliation();

    this.me.update(delta);
    console.log(this.me.x, this.me.y);
    //this.opponent.update(delta);
    //this.ball.update(delta);

    //this.checkBallBoundsCollision();

    //this.checkBallPlayerCollision(this.ball, this.me);
    //this.checkBallPlayerCollision(this.ball, this.opponent);
  }
 
  // reconciliate the most recent game status, if it isn't
  ClientTwoPlayersGameLogic.prototype.reconciliation = function() {
    this.interpolateEntitiesAt(this.time - Constants.game.interpolationTime/1000);

    var lastGameUpdate = this.getLastGameUpdate();

    if ( lastGameUpdate == null ) {
      return;
    }

    this.time = lastGameUpdate.time;

    this.updateFromGameUpdate(lastGameUpdate);
    this.processPendingInputsFrom(lastGameUpdate.lastInputId[this.me.id]);
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
      this.me.update(this.delta);
    }

  }

  ClientTwoPlayersGameLogic.prototype.getLastGameUpdate = function() {
    var lastGameUpdate = null;

    for (index in this.gameUpdates) {
      var gameUpdate = this.gameUpdates[index];

      if (gameUpdate.id > this.lastGameUpdateId) {
        lastGameUpdate = gameUpdate;
        this.lastGameUpdateId = lastGameUpdate.id;
      }
    }

    return lastGameUpdate;
  }

  ClientTwoPlayersGameLogic.prototype.updateFromGameUpdate = function(update) {
    var myNewSelf = null;
    var i = 0;

    while (myNewSelf == null && i < update.entities.length) {
      if (update.entities[i].id == this.me.id) {
        myNewSelf = update.entities[i];
      }
      i++;
    }

    if (myNewSelf) {
      this.me.setStatus(myNewSelf);
    }

  }

  ClientTwoPlayersGameLogic.prototype.interpolateEntitiesAt = function (pastTime) {
    if (pastTime < 0) return;

    //find the states for which the delay is between them
    var prevState = nextState = null;

    for (var i=0; i<this.gameUpdates.length-1; i++) {
      var p = this.gameUpdates[i];
      var n = this.gameUpdates[i+1];

      if (p.time < pastTime && n.time > pastTime) {
        prevState = p;
        nextState = n;
        break;
      }
    }
    
    // too much lag sorry about that
    if (prevState == null || nextState == null) {
      return;
    }

    var elapsedTime = (pastTime - prevState.time) / (nextState.time - prevState.time)
    console.log("et", elapsedTime);

    //interpolate the opponet position
    for ( index in this.entities ) {
      var entity = this.entities[index];

      if (entity.id == this.me.id) {
        continue;
      }

      var prevEntity = this.getEntityInState(prevState, entity.id);
      var nextEntity = this.getEntityInState(nextState, entity.id);

      entity.x = Util.lerp(prevEntity.x, nextEntity.x, elapsedTime);
      entity.y = Util.lerp(prevEntity.y, nextEntity.y, elapsedTime);
    }
  }

  ClientTwoPlayersGameLogic.prototype.getEntityInState = function(state, id) {
    var entity = null;
    var i = 0;

    while (entity == null && i < state.entities.length) {
      if (state.entities[i].id == id) {
        entity = state.entities[i];
      }
      i++;
    }

    return entity;
  }

  ClientTwoPlayersGameLogic.prototype.addGameUpdate = function(update) {
    if (this.gameUpdates.length == 0 ||
      update.time > this.gameUpdates[this.gameUpdates.length-1].time) 
    {
      this.gameUpdates.push(update);

      if (this.gameUpdates.length > Constants.game.maxGameUpdatesBuffer) {
        this.gameUpdates.shift();
      }
    }
  }

  exports.class = ClientTwoPlayersGameLogic;

})(typeof exports != "undefined" ? exports : window['ClientTwoPlayersGameLogic']={});
