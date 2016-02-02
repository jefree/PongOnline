(function(exports) {

  var FullClientGame = function(ctx, width, height) {
    // map of pseudo keys for the player inputs
    this.keymap = {};

    // create the core object for the game
    this.gameLogic = new GameLogic.class(width, height);
    this.gameRenderer = new GameRenderer.class(ctx, this.gameLogic);

    // register a renderer for each type of entities
    this.gameRenderer.addRenderer("Player", PlayerRenderer);
    this.keyboardController = new KeyboardController.class(this.gameLogic);

    // create the entity for the current player and this to the game
    this.player = new Player.class(Constants.player.normal.radius);
    this.gameLogic.addEntity(this.player);

    this.opponent = new Player.class(Constants.player.normal.radius);
    this.opponent.x = 200;
    this.opponent.y = 200;
    this.gameLogic.addEntity(this.opponent);

    this.keyboardController.addEntityInput(this.player.id, Constants.key.RIGHT, "forward");
    this.keyboardController.addEntityInput(this.player.id, Constants.key.LEFT, "backward");
    this.keyboardController.addEntityInput(this.opponent.id, Constants.key.RIGHT, "forward");
    this.keyboardController.addEntityInput(this.opponent.id, Constants.key.LEFT, "backward");

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
