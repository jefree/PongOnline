(function(exports) {
  var Constants = require('../common/Constants');
  var Util = require('../common/Util');

  var FullClientGame = function(ctx, width, height) {
    // create the core object for the game
    this.clientGameLogic = new ClientTwoPlayersGameLogic.class(width, height);
    this.gameRenderer = new GameRenderer.class(ctx, this.clientGameLogic);
    this.network = new NetworkClient.class(new io());

    // register a renderer for each type of entities
    this.gameRenderer.addRenderer("Player", PlayerRenderer);
    this.gameRenderer.addRenderer("Ball", BallRenderer);

    this.keyboardController = new KeyboardController.class(this.clientGameLogic);

//    this.keyboardController.addEntityInput(this.clientGameLogic.player.id, Constants.key.W, "backward");
//    this.keyboardController.addEntityInput(this.clientGameLogic.player.id, Constants.key.S, "forward");

//    this.keyboardController.gameInput.applyInputs = false;
    this.keyboardController.gameInput.addListener('game', this.onInput.bind(this));

    this.network.latency = Constants.game.latency;
    this.network.onConnected(this.onConnected.bind(this));
    this.network.onUpdate(this.onUpdate.bind(this));
  }

  FullClientGame.prototype.update = function() {
    this.keyboardController.update();
    this.clientGameLogic._update();
  }

  FullClientGame.prototype.render = function() {
    this.gameRenderer.render();
    requestAnimationFrame(this.render.bind(this));
  }

  FullClientGame.prototype.onConnected = function(data) {
    this.clientGameLogic.time = data.time;
    this.clientGameLogic.me = this.clientGameLogic.getEntityById(data.me);

    this.keyboardController.addEntityInput(this.clientGameLogic.me.id, Constants.key.DOWN, "forward");
    this.keyboardController.addEntityInput(this.clientGameLogic.me.id, Constants.key.UP, "backward");

    // set the loops for the game logic and the renderer
    var gameLoopInterval = new Util.interval(this.update.bind(this), Constants.game.gameLoopTime);
    gameLoopInterval.run();
    requestAnimationFrame(this.render.bind(this));
  }

  FullClientGame.prototype.onUpdate = function(update) {
    this.clientGameLogic.addGameUpdate(update);
  }

  FullClientGame.prototype.onInput = function(input) {
    this.clientGameLogic.pendingInputs.push(input);
    this.network.emit('input', input);
  }


  exports.class = FullClientGame;
})(typeof exports !== "undefined" ? exports : window["FullClientGame"]={});
