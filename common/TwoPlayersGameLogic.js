(function(exports) {
  var GameLogic = require("./GameLogic").class;
  var Constants = require("./Constants");
  var Ball = require("./Ball").class;
  var Player = require("./Player").class;

  var TwoPlayersGameLogic  = function(width, height) {
    GameLogic.call(this, width, height);

    // create the entity for the current player and this to the game
    this.player = new Player(Constants.player.normal.radius, Constants.player.type.vertical);
    this.addEntity(this.player);

    this.player.x = - this.player.radius*1/2;
    this.player.y = this.height / 2;

     // add a second player
    this.opponent = new Player(Constants.player.normal.radius, Constants.player.type.vertical);
    this.addEntity(this.opponent);

    this.opponent.x = this.width + this.opponent.radius*1/2;
    this.opponent.y = this.height / 2;

    this.ball = new Ball(Constants.ball.normal.radius);
    this.addEntity(this.ball);

    this.ball.x = this.width / 2;
    this.ball.y = this.height / 2;

    this.ball.vx = Constants.ball.normal.speed;
    this.ball.vy = Constants.ball.normal.speed;
  }

  TwoPlayersGameLogic.prototype = Object.create(GameLogic.prototype);
  TwoPlayersGameLogic.prototype.constructor = TwoPlayersGameLogic;

  TwoPlayersGameLogic.prototype.update = function() {
    this.delta = Constants.game.gameLoopTime / 1000;

    this.player.update();
    this.opponent.update();
    this.ball.update();

    this.checkBallBoundsCollision();

    this.checkBallPlayerCollision(this.ball, this.player);
    this.checkBallPlayerCollision(this.ball, this.opponent);
  }

  TwoPlayersGameLogic.prototype.checkBallBoundsCollision = function(){

    if ( this.ball.x - this.ball.radius < 0) {
      this.ball.x = this.ball.radius;
      this.ball.vx *= -1
    }
    if ( this.ball.x + this.ball.radius > this.width) {
      this.ball.x = this.width - this.ball.radius;
      this.ball.vx *= -1
    }
    if ( this.ball.y - this.ball.radius < 0) {
      this.ball.y = this.ball.radius;
      this.ball.vy *= -1
    }
    if ( this.ball.y + this.ball.radius > this.height) {
      this.ball.y = this.height - this.ball.radius;
      this.ball.vy *= -1
    }
  }


  TwoPlayersGameLogic.prototype.checkBallPlayerCollision = function(ball, player) {
    var distanceBallP = this.distanceBetween(ball, player);
    var radiusSum = player.radius + ball.radius;

    if ( distanceBallP < radiusSum ) {

      var normal = {
        x: (ball.x - player.x) / distanceBallP,
        y: (ball.y - player.y) / distanceBallP
      };

      ball.x = player.x + normal.x * radiusSum;
      ball.y = player.y + normal.y * radiusSum;

      var dot = ball.vx*normal.x + ball.vy*normal.y;

      ball.vx = ball.vx - 2 * dot * normal.x;
      ball.vy = ball.vy - 2 * dot * normal.y;
    }
  }

  TwoPlayersGameLogic.prototype.distanceBetween = function(p1, p2) {
    return Math.sqrt( Math.pow(p2.x - p1.x, 2)+Math.pow(p1.y - p2.y, 2));
  }

  exports.class = TwoPlayersGameLogic;
 
})(typeof exports != "undefined" ? exports : window["TwoPlayersGameLogic"]={});

