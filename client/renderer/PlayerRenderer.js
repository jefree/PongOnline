(function(exports) {
  
  var PlayerRenderer = function(ctx){
    this.ctx = ctx;
  }

  PlayerRenderer.prototype.render = function(player) {
    this.ctx.fillStyle = "#DDD";
    this.ctx.beginPath();
    this.ctx.arc(player.x, player.y, player.radius, 0, 2*Math.PI, false);
    this.ctx.fill();
  }

  exports.class = PlayerRenderer;

})(typeof exports !== "undefined" ? exports : window["PlayerRenderer"]={});
