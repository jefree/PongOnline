(function(exports) {

  var FullClientGame = function(ctx, width, height) {
    // create the core object for the game
    this.gameLogic = new ClientTwoPlayersGameLogic.class(width, height);
    this.gameRenderer = new GameRenderer.class(ctx, this.gameLogic);
    this.network = new NetworkClient.class(new io());

    // register a renderer for each type of entities
    this.gameRenderer.addRenderer("Player", PlayerRenderer);
    this.gameRenderer.addRenderer("Ball", BallRenderer);

    this.keyboardController = new KeyboardController.class(this.gameLogic);

//    this.keyboardController.addEntityInput(this.gameLogic.player.id, Constants.key.W, "backward");
//    this.keyboardController.addEntityInput(this.gameLogic.player.id, Constants.key.S, "forward");

    this.keyboardController.gameInput.applyInputs = false;
    this.keyboardController.gameInput.addListener('game', this.onInput.bind(this));

    this.network.onConnected(this.onConnected.bind(this));
    this.network.onUpdate(this.onUpdate.bind(this));
  }

  FullClientGame.prototype.update = function() {
    this.keyboardController.update();
    this.gameLogic.update();
  }

  FullClientGame.prototype.render = function() {
    this.gameRenderer.render();
    requestAnimationFrame(this.render.bind(this));
  }

  FullClientGame.prototype.onConnected = function(data) {
    console.log(data.me);
    this.me = this.gameLogic.getEntityById(data.me);

    this.keyboardController.addEntityInput(this.me.id, Constants.key.DOWN, "forward");
    this.keyboardController.addEntityInput(this.me.id, Constants.key.UP, "backward");

    // set the loops for the game logic and the renderer
    setInterval(this.update.bind(this), Constants.game.gameLoopTime);
    requestAnimationFrame(this.render.bind(this));
  }

  FullClientGame.prototype.onUpdate = function(update) {
    var self = this;

    update.entities.forEach(function(entityStatus){
      var localEntity = self.gameLogic.getEntityById(entityStatus.id);

      if (localEntity) {
        localEntity.setStatus(entityStatus);
      }
    });
  }

  FullClientGame.prototype.onInput = function(input) {
    this.network.emit('input', input);
  }


  exports.class = FullClientGame;
})(typeof exports !== "undefined" ? exports : window["FullClientGame"]={});
