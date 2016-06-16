var ID = 1;

// a NetworkPlayer is just a wrapper for a socket, with some
// utility methods to simulate latency, packet dropping and
// other similar things.
var NetworkPlayer = function(network, socket) {
  this.network = network;
  this.socket = socket;
  this.id = ID++;
}

NetworkPlayer.prototype.on = function(name, callback) {
  this.socket.on(name, callback);
}

NetworkPlayer.prototype.emit = function(name, data) {
  this.socket.emit(name, data);
}

NetworkPlayer.prototype.delay = function(callback) {
  this.network.latency > 0 ? setTimeout(callback, this.network.latency) : callback();
}

exports.class = NetworkPlayer;

