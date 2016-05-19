(function(exports) {
  exports.game = {
    width: 600,
    height: 600,

    gameLoopTime: 16,
    updateLoopTime: 32,
    latency: 0,
    interpolationTime: 64,
    maxGameUpdatesBuffer: 16,
    maxGameStatusesBuffer: 10,
    pingLoopTime: 1000,
    inputClientDelay: 100,
    maxBallDiff: 50
  };

  exports.key = {
    RIGHT: 39,
    LEFT: 37,
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
    A: 65,
    D: 68,
  };

  exports.player = {
    normal: {
      radius: 50,
      speed: 400,
    },
    type: {
      horizontal: 0,
      vertical: 1
    }
  };

  exports.ball = {
    normal: {
      radius: 20,
      speed: 300,
    }
  };

})(typeof exports !== "undefined" ? exports : window['Constants']={});
