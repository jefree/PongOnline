(function(exports) {
  exports.game = {
    width: 600,
    height: 600,

    gameLoopTime: 20,
    updateLoopTime: 50,
    latency: 50,
    interpolationTime: 100,
    maxGameUpdatesBuffer: 4,
    maxGameStatusesBuffer: 10,
    pingLoopTime: 1000
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
      speed: 250,
    },
    type: {
      horizontal: 0,
      vertcal: 1
    }
  };

  exports.ball = {
    normal: {
      radius: 20,
      speed: 200,
    }
  };

})(typeof exports !== "undefined" ? exports : window['Constants']={});
