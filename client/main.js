window.onload = function() {
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");

  var WIDTH = Constants.game.width;
  var HEIGHT = Constants.game.height;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  gameLogic = new GameLogic.new(WIDTH, HEIGHT);
  gameInput = new GameInput.new(gameLogic);
  gameRenderer = new GameRenderer.new(ctx, gameLogic);

  setInterval(gameLogic.update.bind(gameLogic), Constants.game.updateLoopTime);

  requestAnimationFrame(function render() {
    gameRenderer.render();
    requestAnimationFrame(render);
  });
}
