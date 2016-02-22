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

  exports.clone = clone;

})(typeof exports !== "undefined" ? exports : window["Util"]={});
