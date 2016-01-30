var Game = function(ctx, gameLoopTime) {
  this.ctx = ctx;
  this.width = ctx.canvas.width;
  this.height = ctx.canvas.height;
  this.gameLoopTime = gameLoopTime;
}

Game.prototype.init = function() {
  this.gameLoopId = setInterval(this.update.bind(this), this.gameLoopTime);
  this.renderLoopId = window.requestAnimationFrame(this.draw.bind(this));
}

Game.prototype.update = function() {
  console.log("update");
}

Game.prototype.draw = function() {
  this.ctx.fillStyle = "#CCC";
  this.ctx.fillRect(0, 0, this.width, this.height);
}

