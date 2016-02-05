(function(exports) {
  
  var BallRenderer = function(ctx){
    this.ctx = ctx;
  }

  BallRenderer.prototype.render = function(player) {
    this.ctx.fillStyle = "#DDD";
    this.ctx.beginPath();
    this.ctx.arc(player.x, player.y, player.radius, 0, 2*Math.PI, false);
    this.ctx.fill();
  }

  exports.class = BallRenderer;

})(typeof exports !== "undefined" ? exports : window["BallRenderer"]={});
