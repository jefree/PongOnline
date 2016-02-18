var AbstractNetworkGame = require('../network/server/AbstractNetworkGame').class;
var TwoPlayersGameLogic = require('../common/TwoPlayersGameLogic').class;
var GameInput = require('../common/GameInput').class;
var Constants = require('../common/Constants');

var NetworkTwoPlayersGame = function(network) {
  AbstractNetworkGame.call(this, network);

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
  return { me: this.players.length == 1 ? this.gameLogic.player.id : this.gameLogic.opponent.id };
}

NetworkTwoPlayersGame.prototype.onPlayerInput = function(player, input) {
 this.gameInput.addInput(input.entityId, input);
}

NetworkTwoPlayersGame.prototype.gameLoop = function() {
  this.gameLogic.update();
  this.gameInput.update();
}

exports.class = NetworkTwoPlayersGame;

