(function(exports) {
  exports.game = {
    width: 600,
    height: 600,

    updateLoopTime: 45,

  };

  exports.key = {
    RIGHT: 12,
    LEFT: 13,
  };

  exports.player = {
    normal: {
      radius: 20,
    }
  };
})(typeof exports !== "undefined" ? exports : window['Constants']={});
