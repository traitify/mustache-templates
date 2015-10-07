if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun) {
    'use strict';
    var i, len, res, t, thisp, val;
    if (this === void 0 || this === null) {
      throw new TypeError;
    }
    t = Object(this);
    len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError;
    }
    res = [];
    thisp = arguments[1];
    i = 0;
    while (i < len) {
      if (i in t) {
        val = t[i];
        if (fun.call(thisp, val, i, t)) {
          res.push(val);
        }
      }
      i++;
    }
    return res;
  };
}
