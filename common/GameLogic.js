(function(exports) {

  var GameLogic = function(width, height) {
    this.width = width;
    this.height = height;

    this.currentId = 1;
    this.entities = [];
  }

  GameLogic.prototype.update = function() {
    this.entities.forEach(function(entity){
      entity.update();
    });
  }

  GameLogic.prototype.addEntity = function(entity){
    entity.id = this.currentId++;
    this.entities.push(entity);
  }

  exports.class = GameLogic;
})(typeof exports !== 'undefined' ? exports : window['GameLogic']={});
