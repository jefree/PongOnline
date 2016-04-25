(function(exports) {
  var TwoPlayersGameLogic = require('../common/TwoPlayersGameLogic').class;
  var Util = require('../common/Util');
  var Constants = require('../common/Constants');

  var ClientTwoPlayersGameLogic = function (width, height) {
    TwoPlayersGameLogic.call(this, width, height);

    this.me = null; // the entity for this player
    this.pendingInputs = [];
    this.gameStatuses = [];
    this.gameServerUpdates = [];
    this.lastGameUpdateId = 0;
    this.isClient = true;
  }
  ClientTwoPlayersGameLogic.prototype = Object.create(TwoPlayersGameLogic.prototype);
  ClientTwoPlayersGameLogic.prototype.constructor = ClientTwoPlayersGameLogic;

  ClientTwoPlayersGameLogic.prototype.update = function(delta) {
    this.reconciliation();
    this.me.update(delta);
    this.saveGameStatus();
  }

  // reconciliate the most recent game status, if it isn't
  ClientTwoPlayersGameLogic.prototype.reconciliation = function() {
    var lastGameUpdate = this.getLastGameUpdate();

//    if (lastGameUpdate) {
//      this.cleanPendingInputsFrom(lastGameUpdate.lastInputId);
//
//      //check if it is neccesary apply pending inputs
//      for (var i in this.gameStatuses) {
//        var status =  this.gameStatuses[i];
//
//        if (status.lastInputId == lastGameUpdate.lastInputId[this.me.id]) {
//          var me = Util.getEntityByIdFromState(this.me.id, status);
//          var oldMe = Util.getEntityByIdFromState(this.me.id, lastGameUpdate);
//
//          if ( me && oldMe && me.y != oldMe.y ) {
//            this.updateFromGameUpdate(lastGameUpdate);
//            this.processPendingInputsFrom(lastGameUpdate.lastInputId[this.me.id]);
//
//            //clean useless game statuses
//            this.gameStatuses.splice(0, i+1);
//          }
//          break;
//        }
//      }
//    }

    this.interpolateEntitiesAt(this.time - Constants.game.interpolationTime/1000);
  }

  ClientTwoPlayersGameLogic.prototype.cleanPendingInputsFrom = function(lastInputId) {
    for (var i=this.pendingInputs.length-1; i>=0; i--) {
      var pendingInput = this.pendingInputs[i];
      
      if ( pendingInput.id <= lastInputId ) {
        this.pendingInputs.splice(i, 1);
      }
    }
  }

  ClientTwoPlayersGameLogic.prototype.processPendingInputsFrom = function(lastInputId) {

    for ( index in this.pendingInputs ) {
      var input = this.pendingInputs[index];

      this.me.processInput(input);
      this.me.update(this.delta);
    }
  }

  ClientTwoPlayersGameLogic.prototype.getLastGameUpdate = function() {
    if (this.gameServerUpdates.length == 0) return;

    var lastGameUpdate = null;
    var gameUpdate = this.gameServerUpdates[this.gameServerUpdates.length-1];

    if (gameUpdate.id > this.lastGameUpdateId) {
      lastGameUpdate = gameUpdate;
      this.lastGameUpdateId = lastGameUpdate.id;
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

    //find the states for which the pastTime is between them
    var prevState = nextState = null;

    for (var i=0; i<this.gameServerUpdates.length-1; i++) {
      var p = this.gameServerUpdates[i];
      var n = this.gameServerUpdates[i+1];

      if (p.time <= pastTime && n.time > pastTime) {
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

    //interpolate the entitiy position
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

  ClientTwoPlayersGameLogic.prototype.correctEntities = function(gameUpdate, force) {
    for (var i in gameUpdate.entities) {
      var entity = gameUpdate.entities[i];

      if (entity.id == this.me.id) {
        continue;
      }

      var localEntity = this.getEntityById(entity.id);
      this.updateEntityFor(localEntity, entity, gameUpdate.time, force);
    }
  }

  ClientTwoPlayersGameLogic.prototype.updateEntityFor = function(entity, state, pastTime, force) {
    var currentTime = this.time;

    //we update the speed of the entity then get the time gap between currenttime and the
    //update time (pasttime) and move the entity according to the time gap and then check 
    //if the actual position and the predicted one differ each other too much, if so we
    //update the position.

    var localPositon = {
      x: entity.x,
      y: entity.y
    };

    var timeGap = currentTime - pastTime;

    entity.setStatus(state);
    entity.move(timeGap);

    var difX = Math.abs (localPositon.x - entity.x);
    var difY = Math.abs (localPositon.y - entity.y);

    if (difX < 6 && difY < 6) {
      entity.x = localPositon.x;
      entity.y = localPositon.y
    }
    else {
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

  ClientTwoPlayersGameLogic.prototype.saveGameStatus = function() {
    var status = this.getStatus();

    if (this.pendingInputs.length > 0) {
      status.lastInputId = this.pendingInputs[this.pendingInputs.length-1].id;
    }

    this.gameStatuses.push(status);

    if (this.gameStatuses.length > Constants.maxGameStatusesBuffer) {
      this.gameStatuses.shift();
    }
  }

  ClientTwoPlayersGameLogic.prototype.addGameUpdate = function(update) {
    if (this.gameServerUpdates.length == 0 ||
      update.time > this.gameServerUpdates[this.gameServerUpdates.length-1].time) 
    {
      this.gameServerUpdates.push(update);

      if (this.gameServerUpdates.length > Constants.game.maxGameUpdatesBuffer) {
        this.gameServerUpdates.shift();
      }
    }
  }

  exports.class = ClientTwoPlayersGameLogic;

})(typeof exports != "undefined" ? exports : window['ClientTwoPlayersGameLogic']={});
