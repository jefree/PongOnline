(function(exports) {
  
  var Ball = function(radius) {
    this.type = "Ball";

    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
  }

  Ball.prototype.update = function() {
    this.x += this.vx * this.game.delta;
    this.y += this.vy * this.game.delta;
  }

  exports.class = Ball;

})(typeof exports != "undefined" ? exports : window["Ball"]={});
