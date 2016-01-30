(function(exports) {

  var GameRenderer = function(ctx){
    this.ctx = ctx;
    this.game = null; //acts as setGame method
  }

  GameRenderer.prototype.render = function() {
    console.log("render");
  }

  exports.new = GameRenderer;
})(typeof exports !== 'undefined' ? exports : window['GameRenderer']={});
