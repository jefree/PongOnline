(function(exports) {

  function clone(obj) {
    if (typeof obj.clone === "function") {
      return obj.clone();
    }

    var copy = {};

    for ( key in obj ) {
      if ( Array.isArray(obj[key]) ) {
        copy[key] = obj[key].slice(0);
      }
      else if (typeof obj[key] === "object") {
        copy[key] = clone(obj[key]);
      }
      else {
        copy[key] = obj[key];
      }
    }

    return copy;
  }

  function lerp (begin, end, time) {
    return (1-time)*begin + time*end;
  }

  function interval(fn, duration, name){
    var self = this;
    this.baseline = undefined
    
    function programExec(time) {
      self.timer = setTimeout(function(){
          self.run()
      }, time)
    }
    
    this.run = function(){
      if(this.baseline === undefined){
        this.baseline = new Date().getTime();
        programExec(duration);
        return;
      }
      
      fn();

      var end = new Date().getTime();
      this.baseline += duration
      console.log("time info", this.baseline, end);
      
      var nextTick = duration - (end - this.baseline);
      console.log("nextTick", name, nextTick);
      if(nextTick < 0){
        nextTick = 0
      } else if (nextTick > duration) {
        nextTick = duration;
      }
      programExec(nextTick);
    }

    this.stop = function(){
      clearTimeout(this.timer)
    }
  }

  function getEntityByIdFromState(id, state) {
    var entity = null, 
             i = 0;

    while(entity == null && i < state.entities.length) {
      if (state.entities[i].id == id) {
        entity = state.entities[i];
      }
      
      i++;
    }

    return entity;
  }

  exports.distanceBetween = function(p1, p2) {
    return Math.sqrt( Math.pow(p2.x - p1.x, 2)+Math.pow(p1.y - p2.y, 2));
  }

  exports.clone = clone;
  exports.lerp = lerp;
  exports.interval = interval;
  exports.getEntityByIdFromState = getEntityByIdFromState;

})(typeof exports !== "undefined" ? exports : window["Util"]={});
