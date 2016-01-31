(function(exports) {

  var GameRenderer = function(ctx, game){
    this.ctx = ctx;
    this.game = game;
    this.renderers = {};
  }

  GameRenderer.prototype.render = function() {
    this.game.entities.forEach(function(entity) {
      // find the correct renderer for this type of entity and use it
      this.renderers[entity.type].render(entity);
    }.bind(this));
  }

  GameRenderer.prototype.addRenderer = function(type, rendererClass) {
    this.renderers[type] = new rendererClass.class(this.ctx);
  }

  exports.class = GameRenderer;
})(typeof exports !== 'undefined' ? exports : window['GameRenderer']={});
