(function(exports) {

  var FullClientGame = function(ctx, width, height) {
    // map of pseudo keys for the player inputs
    this.keymap = {};

    // create the core object for the game
    this.gameLogic = new GameLogic.class(width, height);
    this.gameInput = new GameInput.class(this.gameLogic);
    this.gameRenderer = new GameRenderer.class(ctx, this.gameLogic);

    // register a renderer for each type of entities
    this.gameRenderer.addRenderer("Player", PlayerRenderer);

    // create the entity for the current player and this to the game
    this.player = new Player.class(Constants.player.normal.radius);
    this.gameLogic.addEntity(this.player);

    this.opponent = new Player.class(Constants.player.normal.radius);
    this.opponent.x = 200;
    this.opponent.y = 200;
    this.gameLogic.addEntity(this.opponent);

    // add an event listener for the keyboard
    this.setKeyListener();

    // set the loops for the game logic and the renderer
    setInterval(this.update.bind(this), Constants.game.updateLoopTime);
    requestAnimationFrame(this.render.bind(this));
  }

  FullClientGame.prototype.setKeyListener = function(){

    document.addEventListener('keydown', function(e){
      switch( e.keyCode ) {
        case Constants.key.RIGHT:
          this.keymap.forward = true;
          break;
        case Constants.key.LEFT:
          this.keymap.backward = true;
          break;
      }
    }.bind(this));

    document.addEventListener('keyup', function(e){
      switch( e.keyCode ) {
        case Constants.key.RIGHT:
          this.keymap.forward = false;
          break;
        case Constants.key.LEFT:
          this.keymap.backward = false;
          break;
      }
    }.bind(this));
  }

  FullClientGame.prototype.update = function() {
    this.processInput();
    this.gameInput.update();
    this.gameLogic.update();
  }

  FullClientGame.prototype.render = function() {
    this.gameRenderer.render();
    requestAnimationFrame(this.render.bind(this));
  }

  FullClientGame.prototype.processInput = function() {

    this.gameInput.addInput(this.player.id, this.keymap);
  }

  exports.class = FullClientGame;
})(typeof exports !== "undefined" ? exports : window["FullClientGame"]={});
