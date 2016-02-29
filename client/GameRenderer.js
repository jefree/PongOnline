(function(exports) {

  var GameRenderer = function(ctx, game){
    this.ctx = ctx;
    this.game = game;
    this.renderers = {};
  }

  GameRenderer.prototype.render = function() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0,0, this.game.width, this.game.height);

    this.game.entities.forEach(function(entity) {
      // find the correct renderer for this type of entity and use it
      this.renderers[entity.type].render(entity);
    }.bind(this));

    this.ctx.fillStyle = "#0F0";
    this.ctx.font = "14px Sans"
    this.ctx.fillText("time: " + this.game.time.toFixed(2), this.game.width-150, 20);

    this.ctx.fillStyle = "#0FF";
    this.ctx.font = "14px Sans"
    this.ctx.fillText("ping: " + (this.game.ping * 1000).toFixed(0), this.game.width-150, 40);
  }

  GameRenderer.prototype.addRenderer = function(type, rendererClass) {
    this.renderers[type] = new rendererClass.class(this.ctx);
  }

  exports.class = GameRenderer;
})(typeof exports !== 'undefined' ? exports : window['GameRenderer']={});
