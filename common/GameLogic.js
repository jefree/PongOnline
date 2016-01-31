(function(exports) {

  var GameLogic = function(width, height) {
    this.width = width;
    this.height = height;

    this.currentId = 1;
    this.entities = [];
  }

  GameLogic.prototype.update = function() {
    //fixed delta time on seconds
    this.delta = Constants.game.updateLoopTime / 1000;

    this.entities.forEach(function(entity){
      entity.update();
    });
  }

  GameLogic.prototype.addEntity = function(entity){
    entity.id = this.currentId++;
    entity.game = this;
    this.entities.push(entity);
  }

  exports.class = GameLogic;
})(typeof exports !== 'undefined' ? exports : window['GameLogic']={});
