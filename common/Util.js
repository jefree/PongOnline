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

  function interval(fn, duration){
    this.baseline = undefined
    
    this.run = function(){
      if(this.baseline === undefined){
        this.baseline = new Date().getTime();
      }
      else {
        fn();
      }

      var end = new Date().getTime()
      this.baseline += duration
   
      var nextTick = duration - (end - this.baseline)
      if(nextTick<0){
        nextTick = 0
      }
      (function(i){
          i.timer = setTimeout(function(){
          i.run(end)
        }, nextTick)
      })(this)
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

  exports.clone = clone;
  exports.lerp = lerp;
  exports.interval = interval;
  exports.getEntityByIdFromState = getEntityByIdFromState;

})(typeof exports !== "undefined" ? exports : window["Util"]={});
