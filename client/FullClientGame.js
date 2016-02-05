(function(exports) {

  var FullClientGame = function(ctx, width, height) {
    // create the core object for the game
    this.gameLogic = new TwoPlayersGameLogic.class(width, height);
    this.gameRenderer = new GameRenderer.class(ctx, this.gameLogic);

    // register a renderer for each type of entities
    this.gameRenderer.addRenderer("Player", PlayerRenderer);
    this.gameRenderer.addRenderer("Ball", BallRenderer);

    this.keyboardController = new KeyboardController.class(this.gameLogic);

    this.keyboardController.addEntityInput(this.gameLogic.player.id, Constants.key.W, "backward");
    this.keyboardController.addEntityInput(this.gameLogic.player.id, Constants.key.S, "forward");

    this.keyboardController.addEntityInput(this.gameLogic.opponent.id, Constants.key.DOWN, "forward");
    this.keyboardController.addEntityInput(this.gameLogic.opponent.id, Constants.key.UP, "backward");

    // set the loops for the game logic and the renderer
    setInterval(this.update.bind(this), Constants.game.updateLoopTime);
    requestAnimationFrame(this.render.bind(this));
  }

  FullClientGame.prototype.update = function() {
    this.keyboardController.update();
    this.gameLogic.update();
  }

  FullClientGame.prototype.render = function() {
    this.gameRenderer.render();
    requestAnimationFrame(this.render.bind(this));
  }

  exports.class = FullClientGame;
})(typeof exports !== "undefined" ? exports : window["FullClientGame"]={});
