(function(exports) {

  var GameLogic = function(width, height) {
    this.width = width;
    this.height = height;

    this.entities = [];
  }

  GameLogic.prototype.update = function() {
    console.log("update");
  }

  GameLogic.prototype.getEntities = function() {
  }

  exports.new = GameLogic;
})(typeof exports !== 'undefined' ? exports : window['GameLogic']={});
