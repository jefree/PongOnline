(function(exports){
  var AbstractClientNetwork = function(socket) {
    this.socket = socket;
    this.latency = 0;
  }

  AbstractClientNetwork.prototype.on = function(name, callback) {
    var self = this;

    this.socket.on(name, function(data){
      self.delay(function(){
        callback.call(null, data)
      });
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

  exports.class = AbstractClientNetwork;

})(typeof exports != "undefined" ? exports : window["NetworkClient"]={});
