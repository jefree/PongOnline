var AbstractNetworkServer = require('../network/server/AbstractNetworkServer').class;
var NetworkTwoPlayersGame = require('./NetworkTwoPlayersGame').class;

var NetworkServer = function(io) {
  AbstractNetworkServer.call(this, io);
}
NetworkServer.prototype = Object.create(AbstractNetworkServer.prototype);
NetworkServer.prototype.constructor = NetworkServer;

NetworkServer.prototype.createNewGame = function() {
  return new NetworkTwoPlayersGame(this);
}

exports.class = NetworkServer;

