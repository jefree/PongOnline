var NetworkPlayer = require('./NetworkPlayer').class;

// A ServerGame contains all the connected players to a specific game instance
// when a new player arrives, it sets all the events for this new player and
// then dispatch the onNewPlayer event which is responsible to communicate
// with the specific game implmentation.
function AbstractServerGame (network) {
  this.network = network;
  this.players = {};
  this.events = {}
}

AbstractServerGame.prototype.addNewPlayer = function(socket) {
  var player = this.players[socket.id] = new NetworkPlayer(this.network, socket);

  // register all the events for the new player
  // all the events receive the player and the data that has arrived
  for (name in this.events) {
    var event = this.events[name];

    player.on(name, function(data) {
      event.call(null, player, data);
    });
  }

  this.onNewPlayer(player);
}

// Register a new event for the players
// If callback must be called within a context make a bind over the original
// function
AbstractServerGame.prototype.addNewPlayerEvent = function(name, callback) {
  this.events[name] = callback;
}

AbstractServerGame.prototype.isAvailable = function() {
  throw "Not Implemented Exception";
}

AbstractServerGame.prototype.onNewPlayer = function(player) {
  throw "Not Implemented Exception";
}

exports.class = AbstractServerGame;

