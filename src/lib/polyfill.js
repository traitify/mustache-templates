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
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}