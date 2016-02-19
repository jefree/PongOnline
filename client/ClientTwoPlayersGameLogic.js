(function(exports) {
  var TwoPlayersGameLogic = require('../common/TwoPlayersGameLogic').class;

  var ClientTwoPlayersGameLogic = function (width, height) {
    TwoPlayersGameLogic.call(this, width, height);
  }
  ClientTwoPlayersGameLogic.prototype = Object.create(TwoPlayersGameLogic.prototype);
  ClientTwoPlayersGameLogic.prototype.constructor = ClientTwoPlayersGameLogic;

  exports.class = ClientTwoPlayersGameLogic;

})(typeof exports != "undefined" ? exports : window['ClientTwoPlayersGameLogic']={});
