(function(exports){
  var Constants = require('./Constants');

  var Player = function(radius, playerType){
    //this.game will set when entity is added to the game

    this.type = "Player";
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.playerType = playerType || Constants.player.type.horizontal;
  }

  Player.prototype.move = function(delta){
    this.x += this.vx * delta;
    this.y += this.vy * delta;
  }

  Player.prototype.update = function(delta) {
    this.move(delta);
    this.vx = this.vy = 0;
  }

  Player.prototype.getStatus = function() {
    return {
      x: this.x,
      y: this.y,
      vx: this.vx,
      vy: this.vy
    }
  }

  Player.prototype.setStatus = function(status) {
    this.x = status.x;
    this.y = status.y;
    this.vx = status.vx;
    this.vy = status.vy;
  }

  Player.prototype.processInput = function(input) {

    if (this.playerType == Constants.player.type.vertical ) {
      this.processInputAsVertical(input);
    }
    else {
      this.processInputAsHorizontal(input);
    }
  }

  Player.prototype.processInputAsHorizontal = function(input) {
    if (input.forward) {
      this.vx += Constants.player.normal.speed;
    }
    else if (input.backward) {
      this.vx += -Constants.player.normal.speed;
    }
  }

  Player.prototype.processInputAsVertical = function(input) {
    if (input.forward) {
      this.vy += Constants.player.normal.speed;
    }
    else if (input.backward) {
      this.vy += -Constants.player.normal.speed;
    }
  }

  exports.class = Player;

})(typeof exports !== "undefined" ? exports : window['Player']={});
