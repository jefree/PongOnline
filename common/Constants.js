(function(exports) {
  exports.game = {
    width: 600,
    height: 600,

    updateLoopTime: 22,

  };

  exports.key = {
    RIGHT: 39,
    LEFT: 37,
  };

  exports.player = {
    normal: {
      radius: 20,
      speed: 100,
    }
  };
})(typeof exports !== "undefined" ? exports : window['Constants']={});
