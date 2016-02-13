var NetworkGame = require('./AbstractNetworkGame').class;
// A NetworkServer manages the connection with the players
// and the creation and ending of the game instances.
// It is just and abstract class which exposes an interface
// that must be implemented to get the stuff working well.
function AbstractNetworkServer(io) {
  this.games = [];
  this.io = io;
  this.latency = 0; //just to simulate fake latency

  this.io.on('connection', this.onNewConnection.bind(this));
}

AbstractNetworkServer.prototype.onNewConnection = function(socket) {
  var game = this.getGameForNewPlayer();

  if (game == null) {
    game = this.createNewGame(this);
    this.games.push(game);
  }

  game.addNewPlayer(socket);
}

AbstractNetworkServer.prototype.getGameForNewPlayer = function(socket) {
  var theGame = null;
  var i = 0;

  while (theGame == null && i < this.games.length) {
    var _game = this.games[i];
    theGame = _game.isAvailable() ? _game : null;
  }

  return theGame;
}

AbstractNetworkServer.prototype.createNewGame = function(network) {
  throw "Not Implemented Exception";
}

exports.class = AbstractNetworkServer;

