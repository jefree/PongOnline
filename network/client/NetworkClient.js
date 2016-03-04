(function(exports){
  var AbstractClientNetwork = function(socket) {
    this.socket = socket;
    this.latency = 0;
    this.ping = 0;
  }

  AbstractClientNetwork.prototype.on = function(name, callback) {
    var self = this;

    this.socket.on(name, function(data){
      callback.call(null, data)
    });
  }

  AbstractClientNetwork.prototype.emit = function(name, data) {
    var self = this;

    this.delay(function() {
      self.socket.emit(name, data);
    });
  }

  AbstractClientNetwork.prototype.delay = function(callback) {
    this.latency > 0 ? setTimeout(callback, this.latency) : callback();
  }

  AbstractClientNetwork.prototype.onConnected = function(callback) {
    this.on('connected', callback);
  }

  AbstractClientNetwork.prototype.onUpdate = function(callback) {
    this.on('update', callback);
  }

  AbstractClientNetwork.prototype.onPing = function(callback) {
    this.on('onping', callback);
  }

  exports.class = AbstractClientNetwork;

})(typeof exports != "undefined" ? exports : window["NetworkClient"]={});
