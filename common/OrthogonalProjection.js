function getLineEq(vector, origin) {
  var A = vector.x;
  var B = vector.y;

  var x1 = origin.x;
  var y1 = origin.y;

  if ( A == 0 && B == 0) return;

  var eq = {};

  var x2 = x1 + A;
  var y2 = y1 + B;

  if (x2 - x1 == 0) { // parallel to X axis
    eq.v = 'x';
    eq.cX = 1;
    eq.cY = 0;
    eq.C = x1;
  }
  else if (y2 - y1 == 0) { // parallel to Y axis
    eq.v = 'y';
    eq.cX = 0;
    eq.cY = 1;
    eq.C = y1;
  }
  else {
    var z =  (y2 - y1) / (x2 - x1);

    eq.v = 'y';
    eq.cX = z;
    eq.cY = 1;
    eq.C = -z*x1 + y1;
  }

  return eq;
}

function project (vector, origin, point) {
  var targetEq = getLineEq(vector, origin);

  var perp = { x: -vector.y, y: vector.x };
  var perpEq = getLineEq(perp, point);

  var a = targetEq.cX;
  var b = targetEq.C;
  var c = perpEq.cX;
  var d = perpEq.C;

  var x, y;

  if (a - c == 0) return;

  if (targetEq.v == 'y' && perpEq.v == 'y') {
    x = (d - b) / (a - c);
    y = a * x + b;
  }
  else if (targetEq.v == 'x') {
    x = targetEq.C;
    y = c * x + d;
  }
  else if ( perpEq.v == 'x' ) {
    x = perpEq.C;
    y = a * x + b;
  }

  return { x: x, y: y };
}

exports.getLineEq = getLineEq;
exports.project = project;

