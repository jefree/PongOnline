(function(exports) {

  var FullClientGame = function(ctx, width, height) {
    // create the core object for the game
    this.gameLogic = new GameLogic.class(width, height);
    this.gameRenderer = new GameRenderer.class(ctx, this.gameLogic);

    // register a renderer for each type of entities
    this.gameRenderer.addRenderer("Player", PlayerRenderer);
    this.keyboardController = new KeyboardController.class(this.gameLogic);

    // create the entity for the current player and this to the game
    this.player = new Player.class(Constants.player.normal.radius, Constants.player.type.vertical);
    this.gameLogic.addEntity(this.player);

    this.player.x = - this.player.radius*1/2;
    this.player.y = this.gameLogic.height / 2;

    this.keyboardController.addEntityInput(this.player.id, Constants.key.W, "backward");
    this.keyboardController.addEntityInput(this.player.id, Constants.key.S, "forward");

     // add a second player
    this.opponent = new Player.class(Constants.player.normal.radius, Constants.player.type.vertical);
    this.gameLogic.addEntity(this.opponent);

    this.opponent.x = this.gameLogic.width + this.opponent.radius*1/2;
    this.opponent.y = this.gameLogic.height / 2;

    this.keyboardController.addEntityInput(this.opponent.id, Constants.key.DOWN, "forward");
    this.keyboardController.addEntityInput(this.opponent.id, Constants.key.UP, "backward");

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
