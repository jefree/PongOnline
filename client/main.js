window.onload = function() {
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");

  var width = Constants.game.width;
  var height = Constants.game.height;

  canvas.width = width;
  canvas.height = height;

  var game = new FullClientGame.new(ctx, width, height);

}
