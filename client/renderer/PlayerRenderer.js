(function(exports) {
  
  var PlayerRenderer = function(ctx){
    this.ctx = ctx;
  }

  PlayerRenderer.prototype.render = function(player) {
    console.log("render player", player.id);
  }

  exports.new = PlayerRenderer;

})(typeof exports !== "undefined" ? exports : window["PlayerRenderer"]={});
