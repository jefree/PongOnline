(function(exports) {
  
  var PlayerRenderer = function(ctx){
    this.ctx = ctx;
  }

  PlayerRenderer.prototype.render = function(player) {
    this.ctx.fillStyle = "#DDD";
    this.ctx.fillRect(player.x, player.y, player.radius, player.radius);
  }

  exports.class = PlayerRenderer;

})(typeof exports !== "undefined" ? exports : window["PlayerRenderer"]={});
