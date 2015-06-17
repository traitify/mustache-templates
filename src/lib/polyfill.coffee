if !Array::filter

  Array::filter = (fun) ->
    'use strict'
    if this == undefined or this == null
      throw new TypeError
    t = Object(this)
    len = t.length >>> 0
    if typeof fun != 'function'
      throw new TypeError
    res = []
    thisp = arguments[1]
    i = 0
    while i < len
      if i of t
        val = t[i]
        # in case fun mutates this
        if fun.call(thisp, val, i, t)
          res.push val
      i++
    res
