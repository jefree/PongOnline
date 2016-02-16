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
  var self = this;

  this.socket.on(name, function(data){
    self.delay(function(){
      callback.call(null, data);
   });
  });
}

NetworkPlayer.prototype.emit = function(name, data) {
  var self = this;

  this.delay(function() {
    self.socket.emit(name, data);
  });
}

NetworkPlayer.prototype.delay = function(callback) {
  this.network.latency > 0 ? setTimeout(callback, this.network.latency) : callback();
}

exports.class = NetworkPlayer;
