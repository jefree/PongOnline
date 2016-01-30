(function() {
  var WORLD_WIDTH = 600;
  var WORLD_HEIGHT = 600;

  window.onload = function() {
    var canvas = document.getElementById("game-canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = WORLD_WIDTH;
    canvas.height = WORLD_HEIGHT;

    var game = new Game(ctx, 45); //run the game loop at 45ms
    game.init();
  }
})();

