var AbstractNetworkGame = require('../network/server/AbstractNetworkGame').class;
var TwoPlayersGameLogic = require('../common/TwoPlayersGameLogic').class;
var GameInput = require('../common/GameInput').class;
var Constants = require('../common/Constants');

var NetworkTwoPlayersGame = function(network) {
  AbstractNetworkGame.call(this, network);

  this.gameLogic = new TwoPlayersGameLogic(Constants.game.width, Constants.game.height);
  this.gameInput = new GameInput(this.gameLogic);

  this.addNewPlayerEvent('input', this.onPlayerInput.bind(this));

  //set intervals for the game logic and input as well as for game update.
  this.gameUpdateLoopId = setInterval(this.gameUpdate.bind(this), 16);
  this.gameBroadcastUpdateLoopId = setInterval(this.broadcastUpdate.bind(this), 45);
}
NetworkTwoPlayersGame.prototype = Object.create(AbstractNetworkGame.prototype);
NetworkTwoPlayersGame.prototype.constructor = NetworkTwoPlayersGame;

NetworkTwoPlayersGame.prototype.isAvailable = function() {
  return Object.keys(this.players).length < 2;
}

NetworkTwoPlayersGame.prototype.onNewPlayer = function(player) {
  return { me: Object.keys(this.players).length == 1 ? this.gameLogic.player.id : this.gameLogic.opponent.id };
}

NetworkTwoPlayersGame.prototype.onPlayerInput = function(player, input) {
 this.gameInput.addInput(input.entityId, input);
}

NetworkTwoPlayersGame.prototype.gameUpdate = function() {
  this.gameLogic.update();
  this.gameInput.update();
}

// maybe this should be in a better place
NetworkTwoPlayersGame.prototype.broadcastUpdate = function() {
  var gameStatus = {};

  gameStatus.entities = [];

  this.gameLogic.entities.forEach(function(entity){
    var entityStatus = entity.getStatus();
    entityStatus.id = entity.id;
    gameStatus.entities.push(entityStatus);
  });

  var self = this;
  Object.keys(this.players).forEach(function(key){
    self.players[key].emit('update', gameStatus);
  });
}

exports.class = NetworkTwoPlayersGame;

