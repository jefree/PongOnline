(function(exports){
  var Player = function(game, radius){
    this.type = "Player";
    this.radius = radius;
  }

  Player.prototype.move = function(){
    this.x = this.vx;
    this.y = this.vy;
  }

  Player.prototype.update = function() {
    console.log("player update", this.id);
    this.move();
  }

  exports.class = Player;

})(typeof exports !== "undefined" ? exports : window['Player']={});
