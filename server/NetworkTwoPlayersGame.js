var AbstractNetworkGame = require('../network/server/AbstractNetworkGame').class;
var TwoPlayersGameLogic = require('../common/TwoPlayersGameLogic').class;
var GameInput = require('../common/GameInput').class;
var Constants = require('../common/Constants');

var NetworkTwoPlayersGame = function(network) {
  AbstractNetworkGame.call(this, network);

  this.gameStatusId = 1;

  this.gameLogic = new TwoPlayersGameLogic(Constants.game.width, Constants.game.height);
  this.gameInput = new GameInput(this.gameLogic);

  this.addNewPlayerEvent('input', this.onPlayerInput.bind(this));

  this.beginGame(Constants.game.gameLoopTime, Constants.game.updateLoopTime);
}
NetworkTwoPlayersGame.prototype = Object.create(AbstractNetworkGame.prototype);
NetworkTwoPlayersGame.prototype.constructor = NetworkTwoPlayersGame;

NetworkTwoPlayersGame.prototype.isAvailable = function() {
  return this.players.length < 2;
}

NetworkTwoPlayersGame.prototype.onNewPlayer = function(player) {
  var entity = this.players.length == 1 ? this.gameLogic.player : this.gameLogic.opponent;
  player.entity = entity;
  player.lastPendingInputId = 0;

  return { me : player.entity.id };
}

NetworkTwoPlayersGame.prototype.onPlayerInput = function(player, input) {
  player.lastPendingInputId = input.id;
  this.gameInput.inputs.push(input);
}

NetworkTwoPlayersGame.prototype.gameLoop = function() {
  this.gameInput.update();
  this.gameLogic._update();

  this.updatePlayersLastInput();
}

NetworkTwoPlayersGame.prototype.updatePlayersLastInput = function() {
  this.players.forEach(function(player) {
    player.lastInputId = player.lastPendingInputId;
  });

}

NetworkTwoPlayersGame.prototype.updateLoop = function() {
  var gameStatus = {};

  gameStatus.id = this.gameStatusId++;
  gameStatus.entities = [];
  gameStatus.lastInputId = {};
  gameStatus.time = this.gameLogic.time;

  this.gameLogic.entities.forEach(function(entity){
    var entityStatus = entity.getStatus();
    entityStatus.id = entity.id;
    gameStatus.entities.push(entityStatus);
  });

  for ( index in this.players) {
    var player = this.players[index];
    gameStatus.lastInputId[player.entity.id] = player.lastInputId;
  }

  for ( index in this.players) {
    var player = this.players[index];
    player.emit('update', gameStatus);
  }
}

exports.class = NetworkTwoPlayersGame;

