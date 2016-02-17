(function(exports) {

  var GameLogic = function(width, height) {
    this.width = width;
    this.height = height;

    this.currentId = 1;
    this.entities = [];
  }

  GameLogic.prototype.update = function() {
  }

  GameLogic.prototype.addEntity = function(entity){
    entity.id = this.currentId++;
    entity.game = this;
    this.entities.push(entity);
  }

  GameLogic.prototype.getEntityById = function(id) {
    var entity = null;
    var i = 0;

    do {
      entity = this.entities[i];
      i++;
    } while (entity.id != id && i < this.entities.length);

    return entity;
  }

  exports.class = GameLogic;
})(typeof exports !== 'undefined' ? exports : window['GameLogic']={});
