var AbstractNetworkGame = require('../network/server/AbstractNetworkGame').class;
var TwoPlayersGameLogic = require('../common/TwoPlayersGameLogic').class;
var GameInput = require('../common/GameInput').class;
var Constants = require('../common/Constants');

var NetworkTwoPlayersGame = function(network) {
  AbstractNetworkGame.call(this, network);

  this.gameLogic = new TwoPlayersGameLogic(Constants.game.width, Constants.game.height);
  this.gameInput = new GameInput(this.gameLogic);

  this.addNewPlayerEvent('input', this.onPlayerInput.bind(this));
  this.addNewPlayerEvent('onping', this.onPing.bind(this));

  this.beginGame(Constants.game.gameLoopTime, Constants.game.updateLoopTime);
}
NetworkTwoPlayersGame.prototype = Object.create(AbstractNetworkGame.prototype);
NetworkTwoPlayersGame.prototype.constructor = NetworkTwoPlayersGame;

NetworkTwoPlayersGame.prototype.isAvailable = function() {
  return this.players.length < 2;
}

NetworkTwoPlayersGame.prototype.onNewPlayer = function(player) {
  var playerEntity, opponentEntity;

  if (this.players.length == 1) {
    playerEntity = this.gameLogic.player;
    opponentEntity = this.gameLogic.opponent;
  }
  else {
    playerEntity = this.gameLogic.opponent;
    opponentEntity = this.gameLogic.player;
  }

  player.entity = playerEntity;
  player.lastPendingInputId = 0;

  return { me : playerEntity.id, opponent: opponentEntity.id, time: this.gameLogic.time, gameStatus: this.gameLogic.getStatus()};
}

NetworkTwoPlayersGame.prototype.onPlayerInput = function(player, input) {
  player.lastPendingInputId = input.id;
  this.gameInput.inputs.push(input);
}

NetworkTwoPlayersGame.prototype.onPing = function(player, data) {
  player.emit('onping', data);
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
  var gameStatus = this.gameLogic.getStatus();
  gameStatus.lastInputId = {};

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

