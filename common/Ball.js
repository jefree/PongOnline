(function(exports) {
  
  var Ball = function(radius) {
    this.type = "Ball";

    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
  }

  Ball.prototype.move = function(delta) {
    this.x += this.vx * delta;
    this.y += this.vy * delta;
  }

  Ball.prototype.update = function(delta) {
    this.move(delta);
  }

  Ball.prototype.getStatus = function() {
    return {
      x: this.x,
      y: this.y,
      vx: this.vx,
      vy: this.vy
    }
  }

  Ball.prototype.setStatus = function(status) {
    this.x = status.x;
    this.y = status.y;
    this.vx = status.vx;
    this.vy = status.vy;
  }

  exports.class = Ball;

})(typeof exports != "undefined" ? exports : window["Ball"]={});
