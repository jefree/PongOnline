(function(exports) {
  var Constants = require("./Constants");

  var GameLogic = function(width, height) {
    this.width = width;
    this.height = height;

    this.currentId = 1;
    this.time = 0;
    this.entities = [];
    this.players = [];
  }

  // this must be the method to call for the game  loop
  GameLogic.prototype._update = function() {
    this.delta = Constants.game.gameLoopTime / 1000; //also we can calculate the elapsed time since the last frame
    this.time += this.delta;
    this.update(this.delta);
  }

  // each game has an specific update implementation
  GameLogic.prototype.update = function(delta) {
    throw "Not Implemented Error";
  }

  GameLogic.prototype.addEntity = function(entity, isPlayer){
    entity.id = this.currentId++;
    entity.game = this;
    this.entities.push(entity);
    
  }

  GameLogic.prototype.addPlayer = function(player) {
    this.addEntity(player);
    this.players.push(player);
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
