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
    this.playerType = playerType || Constants.player.type.horizantal;
  }

  Player.prototype.move = function(){
    this.x += this.vx * this.game.delta;
    this.y += this.vy * this.game.delta;
  }

  Player.prototype.update = function() {
    this.move();
    this.vx = this.vy = 0;
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
      this.vx = Constants.player.normal.speed;
    }
    else if (input.backward) {
      this.vx = -Constants.player.normal.speed;
    }
  }

  Player.prototype.processInputAsVertical = function(input) {
    if (input.forward) {
      this.vy = Constants.player.normal.speed;
    }
    else if (input.backward) {
      this.vy = -Constants.player.normal.speed;
    }
  }

  exports.class = Player;

})(typeof exports !== "undefined" ? exports : window['Player']={});
