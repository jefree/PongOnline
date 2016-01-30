(function(exports) {

  var FullClientGame = function(ctx, width, height) {
    this.gameLogic = new GameLogic.new(width, height);
    this.gameInput = new GameInput.new(this.gameLogic);
    this.gameRenderer = new GameRenderer.new(ctx, this.gameLogic);
    console.log(this.gameRenderer);
    this.keymap = {};

    // create the entity for the current player and this to the game
    this.player = new Player.new(Constants.player.normal.radius);
    this.gameLogic.addEntity(this.player);

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
    });

    document.addEventListener('keyup', function(e){
      switch( e.keyCode ) {
        case Constants.key.RIGHT:
          this.keymap.forward = false;
          break;
        case Constants.key.LEFT:
          this.keymap.backward = false;
          break;
      }
    });
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
    this.gameInput.addInput(this.player.id, this.keymaps);
  }

  exports.new = FullClientGame;
})(typeof exports !== "undefined" ? exports : window["FullClientGame"]={});
