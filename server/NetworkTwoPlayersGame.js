var AbstractNetworkGame = require('../network/server/AbstractNetworkGame').class;
var TwoPlayersGameLogic = require('../common/TwoPlayersGameLogic').class;
var GameInput = require('../common/GameInput').class;
var Constants = require('../common/Constants');

var NetworkTwoPlayersGame = function(network) {
  AbstractNetworkGame.call(this, network);

  this.gameLogic = new TwoPlayersGameLogic(Constants.game.width, Constants.game.height);
  this.gameInput = new GameInput(this.gameLogic);

  this.addNewPlayerEvent('input', this.onPlayerInput.bind(this));
}
NetworkTwoPlayersGame.prototype = Object.create(AbstractNetworkGame.prototype);
NetworkTwoPlayersGame.prototype.constructor = NetworkTwoPlayersGame;

NetworkTwoPlayersGame.prototype.isAvailable = function() {
  return this.players.length < 2;
}

NetworkTwoPlayersGame.prototype.onNewPlayer = function(player) {
  if (this.players.length == 2) {
    this.beginGame();
  }

  return { player: this.players.length };
}

NetworkTwoPlayersGame.prototype.beginGame = function() {
  //set intervals for the game logic and input as well as for game update.
}

NetworkTwoPlayersGame.prototype.onPlayerInput = function(player, input) {
  console.log(input);
}

exports.class = NetworkTwoPlayersGame;

