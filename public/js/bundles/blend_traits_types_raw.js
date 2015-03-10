/* Riot v2.0.12, @license MIT, (c) 2015 Muut Inc. + contributors */

;(function() {

  var riot = { version: 'v2.0.12', settings: {} }

  'use strict'

riot.observable = function(el) {

  el = el || {}

  var callbacks = {},
      _id = 0

  el.on = function(events, fn) {
    if (typeof fn == 'function') {
      fn._id = typeof fn._id == 'undefined' ? _id++ : fn._id

      events.replace(/\S+/g, function(name, pos) {
        (callbacks[name] = callbacks[name] || []).push(fn)
        fn.typed = pos > 0
      })
    }
    return el
  }

  el.off = function(events, fn) {
    if (events == '*') callbacks = {}
    else {
      events.replace(/\S+/g, function(name) {
        if (fn) {
          var arr = callbacks[name]
          for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
            if (cb._id == fn._id) { arr.splice(i, 1); i-- }
          }
        } else {
          callbacks[name] = []
        }
      })
    }
    return el
  }

  // only single event supported
  el.one = function(name, fn) {
    if (fn) fn.one = 1
    return el.on(name, fn)
  }

  el.trigger = function(name) {
    var args = [].slice.call(arguments, 1),
        fns = callbacks[name] || []

    for (var i = 0, fn; (fn = fns[i]); ++i) {
      if (!fn.busy) {
        fn.busy = 1
        fn.apply(el, fn.typed ? [name].concat(args) : args)
        if (fn.one) { fns.splice(i, 1); i-- }
         else if (fns[i] !== fn) { i-- } // Makes self-removal possible during iteration
        fn.busy = 0
      }
    }

    return el
  }

  return el

}
;(function(riot, evt) {

  // browsers only
  if (!this.top) return

  var loc = location,
      fns = riot.observable(),
      win = window,
      current

  function hash() {
    return loc.hash.slice(1)
  }

  function parser(path) {
    return path.split('/')
  }

  function emit(path) {
    if (path.type) path = hash()

    if (path != current) {
      fns.trigger.apply(null, ['H'].concat(parser(path)))
      current = path
    }
  }

  var r = riot.route = function(arg) {
    // string
    if (arg[0]) {
      loc.hash = arg
      emit(arg)

    // function
    } else {
      fns.on('H', arg)
    }
  }

  r.exec = function(fn) {
    fn.apply(null, parser(hash()))
  }

  r.parser = function(fn) {
    parser = fn
  }

  win.addEventListener ? win.addEventListener(evt, emit, false) : win.attachEvent('on' + evt, emit)

})(riot, 'hashchange')
/*

//// How it works?


Three ways:

1. Expressions: tmpl('{ value }', data).
   Returns the result of evaluated expression as a raw object.

2. Templates: tmpl('Hi { name } { surname }', data).
   Returns a string with evaluated expressions.

3. Filters: tmpl('{ show: !done, highlight: active }', data).
   Returns a space separated list of trueish keys (mainly
   used for setting html classes), e.g. "show highlight".


// Template examples

tmpl('{ title || "Untitled" }', data)
tmpl('Results are { results ? "ready" : "loading" }', data)
tmpl('Today is { new Date() }', data)
tmpl('{ message.length > 140 && "Message is too long" }', data)
tmpl('This item got { Math.round(rating) } stars', data)
tmpl('<h1>{ title }</h1>{ body }', data)


// Falsy expressions in templates

In templates (as opposed to single expressions) all falsy values
except zero (undefined/null/false) will default to empty string:

tmpl('{ undefined } - { false } - { null } - { 0 }', {})
// will return: " - - - 0"

*/


var brackets = (function(orig, s, b) {
  return function(x) {

    // make sure we use the current setting
    s = riot.settings.brackets || orig
    if (b != s) b = s.split(' ')

    // if regexp given, rewrite it with current brackets (only if differ from default)
    // else, get brackets
    return x && x.test
      ? s == orig
        ? x : RegExp(x.source
                      .replace(/\{/g, b[0].replace(/(?=.)/g, '\\'))
                      .replace(/\}/g, b[1].replace(/(?=.)/g, '\\')),
                    x.global ? 'g' : '')
      : b[x]

  }
})('{ }')


var tmpl = (function() {

  var cache = {},
      re_vars = /(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_$]\w*)/gi
              // [ 1               ][ 2  ][ 3 ][ 4                                                                                  ][ 5       ]
              // find variable names:
              // 1. skip quoted strings and regexps: "a b", 'a b', 'a \'b\'', /a b/
              // 2. skip object properties: .name
              // 3. skip object literals: name:
              // 4. skip javascript keywords
              // 5. match var name

  // build a template (or get it from cache), render with data
  return function(str, data) {
    return str && (cache[str] = cache[str] || tmpl(str))(data)
  }


  // create a template instance

  function tmpl(s, p) {

    // default template string to {}
    s = (s || (brackets(0) + brackets(1)))

      // temporarily convert \{ and \} to a non-character
      .replace(brackets(/\\{/g), '\uFFF0')
      .replace(brackets(/\\}/g), '\uFFF1')

    // split string to expression and non-expresion parts
    p = split(s, brackets(/{[\s\S]*?}/g))

    return new Function('d', 'return ' + (

      // is it a single expression or a template? i.e. {x} or <b>{x}</b>
      !p[0] && !p[2] && !p[3]

        // if expression, evaluate it
        ? expr(p[1])

        // if template, evaluate all expressions in it
        : '[' + p.map(function(s, i) {

            // is it an expression or a string (every second part is an expression)
          return i % 2

              // evaluate the expressions
              ? expr(s, true)

              // process string parts of the template:
              : '"' + s

                  // preserve new lines
                  .replace(/\n/g, '\\n')

                  // escape quotes
                  .replace(/"/g, '\\"')

                + '"'

        }).join(',') + '].join("")'
      )

      // bring escaped { and } back
      .replace(/\uFFF0/g, brackets(0))
      .replace(/\uFFF1/g, brackets(1))

    + ';')

  }


  // parse { ... } expression

  function expr(s, n) {
    s = s

      // convert new lines to spaces
      .replace(/\n/g, ' ')

      // trim whitespace, curly brackets, strip comments
      .replace(brackets(/^[{ ]+|[ }]+$|\/\*.+?\*\//g), '')

    // is it an object literal? i.e. { key : value }
    return /^\s*[\w- "']+ *:/.test(s)

      // if object literal, return trueish keys
      // e.g.: { show: isOpen(), done: item.done } -> "show done"
      ? '[' + s.replace(/\W*([\w- ]+)\W*:([^,]+)/g, function(_, k, v) {

        return v.replace(/[^&|=!><]+/g, wrap) + '?"' + k.trim() + '":"",'

      }) + '].join(" ").trim()'

      // if js expression, evaluate as javascript
      : wrap(s, n)

  }


  // execute js w/o breaking on errors or undefined vars

  function wrap(s, nonull) {
    s = s.trim()
    return !s ? '' : '(function(v){try{v='

        // prefix vars (name => data.name)
        + (s.replace(re_vars, function(s, _, v) { return v ? '(d.'+v+'===undefined?window.'+v+':d.'+v+')' : s })

          // break the expression if its empty (resulting in undefined value)
          || 'x')

      + '}finally{return '

        // default to empty string for falsy values except zero
        + (nonull === true ? '!v&&v!==0?"":v' : 'v')

      + '}}).call(d)'
  }


  // a substitute for str.split(re) for IE8
  // because IE8 doesn't support capturing parenthesis in it

  function split(s, re) {
    var parts = [], last = 0
    s.replace(re, function(m, i) {
      // push matched expression and part before it
      parts.push(s.slice(last, i), m)
      last = i + m.length
    })
    // push the remaining part
    return parts.concat(s.slice(last))
  }

})()

// { key, i in items} -> { key, i, items }
function loopKeys(expr) {
  var ret = { val: expr },
      els = expr.split(/\s+in\s+/)

  if (els[1]) {
    ret.val = brackets(0) + els[1]
    els = els[0].slice(brackets(0).length).trim().split(/,\s*/)
    ret.key = els[0]
    ret.pos = els[1]
  }

  return ret
}

function mkitem(expr, key, val) {
  var item = {}
  item[expr.key] = key
  if (expr.pos) item[expr.pos] = val
  return item
}


/* Beware: heavy stuff */
function _each(dom, parent, expr) {

  remAttr(dom, 'each')

  var template = dom.outerHTML,
      prev = dom.previousSibling,
      root = dom.parentNode,
      rendered = [],
      tags = [],
      checksum

  expr = loopKeys(expr)

  function add(pos, item, tag) {
    rendered.splice(pos, 0, item)
    tags.splice(pos, 0, tag)
  }

  // clean template code
  parent.one('update', function() {
    root.removeChild(dom)

  }).one('premount', function() {
    if (root.stub) root = parent.root

  }).on('update', function() {

    var items = tmpl(expr.val, parent)
    if (!items) return

    // object loop. any changes cause full redraw
    if (!Array.isArray(items)) {
      var testsum = JSON.stringify(items)
      if (testsum == checksum) return
      checksum = testsum

      // clear old items
      each(tags, function(tag) { tag.unmount() })
      rendered = []
      tags = []

      items = Object.keys(items).map(function(key) {
        return mkitem(expr, key, items[key])
      })

    }

    // unmount redundant
    each(arrDiff(rendered, items), function(item) {
      var pos = rendered.indexOf(item),
          tag = tags[pos]

      if (tag) {
        tag.unmount()
        rendered.splice(pos, 1)
        tags.splice(pos, 1)
      }

    })

    // mount new / reorder
    var nodes = root.childNodes,
        prev_index = [].indexOf.call(nodes, prev)

    each(items, function(item, i) {

      // start index search from position based on the current i
      var pos = items.indexOf(item, i),
          oldPos = rendered.indexOf(item, i)

      // if not found, search backwards from current i position
      pos < 0 && (pos = items.lastIndexOf(item, i))
      oldPos < 0 && (oldPos = rendered.lastIndexOf(item, i))

      // mount new
      if (oldPos < 0) {
        if (!checksum && expr.key) item = mkitem(expr, item, pos)

        var tag = new Tag({ tmpl: template }, {
          before: nodes[prev_index + 1 + pos],
          parent: parent,
          root: root,
          item: item
        })

        tag.mount()

        return add(pos, item, tag)
      }

      // change pos value
      if (expr.pos && tags[oldPos][expr.pos] != pos) {
        tags[oldPos].one('update', function(item) {
          item[expr.pos] = pos
        })
        tags[oldPos].update()
      }

      // reorder
      if (pos != oldPos) {
        root.insertBefore(nodes[prev_index + oldPos + 1], nodes[prev_index + pos + 1])
        return add(pos, rendered.splice(oldPos, 1)[0], tags.splice(oldPos, 1)[0])
      }

    })

    rendered = items.slice()

  })

}


function parseNamedElements(root, parent, child_tags) {

  walk(root, function(dom) {
    if (dom.nodeType == 1) {

      // custom child tag
      var child = getTag(dom)

      if (child && !dom.getAttribute('each')) {
        var tag = new Tag(child, { root: dom, parent: parent })
        parent.tags[dom.getAttribute('name') || child.name] = tag
        child_tags.push(tag)
      }

      each(dom.attributes, function(attr) {
        if (/^(name|id)$/.test(attr.name)) parent[attr.value] = dom
      })
    }

  })

}

function parseExpressions(root, tag, expressions) {

  function addExpr(dom, val, extra) {
    if (val.indexOf(brackets(0)) >= 0) {
      var expr = { dom: dom, expr: val }
      expressions.push(extend(expr, extra))
    }
  }

  walk(root, function(dom) {
    var type = dom.nodeType

    // text node
    if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue)
    if (type != 1) return

    /* element */

    // loop
    var attr = dom.getAttribute('each')
    if (attr) { _each(dom, tag, attr); return false }

    // attribute expressions
    each(dom.attributes, function(attr) {
      var name = attr.name,
          bool = name.split('__')[1]

      addExpr(dom, attr.value, { attr: bool || name, bool: bool })
      if (bool) { remAttr(dom, name); return false }

    })

    // skip custom tags
    if (getTag(dom)) return false

  })

}

function Tag(impl, conf) {

  var self = riot.observable(this),
      opts = inherit(conf.opts) || {},
      dom = mkdom(impl.tmpl),
      parent = conf.parent,
      expressions = [],
      child_tags = [],
      root = conf.root,
      item = conf.item,
      fn = impl.fn,
      attr = {},
      loop_dom

  if (fn && root.riot) return
  root.riot = true

  extend(this, { parent: parent, root: root, opts: opts, tags: {} }, item)

  // grab attributes
  each(root.attributes, function(el) {
    attr[el.name] = el.value
  })

  // options
  function updateOpts(rem_attr) {
    each(Object.keys(attr), function(name) {
      opts[name] = tmpl(attr[name], parent || self)
    })
  }

  this.update = function(data, init) {
    extend(self, data, item)
    updateOpts()
    self.trigger('update', item)
    update(expressions, self, item)
    self.trigger('updated')
  }

  this.mount = function() {

    updateOpts()

    // initialiation
    fn && fn.call(self, opts)

    toggle(true)

    // parse layout after init. fn may calculate args for nested custom tags
    parseExpressions(dom, self, expressions)

    self.update()

    // internal use only, fixes #403
    self.trigger('premount')

    if (fn) {
      while (dom.firstChild) root.appendChild(dom.firstChild)

    } else {
      loop_dom = dom.firstChild
      root.insertBefore(loop_dom, conf.before || null) // null needed for IE8
    }

    if (root.stub) self.root = root = parent.root
    self.trigger('mount')

  }


  this.unmount = function() {
    var el = fn ? root : loop_dom,
        p = el.parentNode

    if (p) {
      if (parent) p.removeChild(el)
      else while (root.firstChild) root.removeChild(root.firstChild)
      toggle()
      self.trigger('unmount')
      self.off('*')
      delete root.riot
    }

  }

  function toggle(is_mount) {

    // mount/unmount children
    each(child_tags, function(child) { child[is_mount ? 'mount' : 'unmount']() })

    // listen/unlisten parent (events flow one way from parent to children)
    if (parent) {
      var evt = is_mount ? 'on' : 'off'
      parent[evt]('update', self.update)[evt]('unmount', self.unmount)
    }
  }

  // named elements available for fn
  parseNamedElements(dom, this, child_tags)


}

function setEventHandler(name, handler, dom, tag, item) {

  dom[name] = function(e) {

    // cross browser event fix
    e = e || window.event
    e.which = e.which || e.charCode || e.keyCode
    e.target = e.target || e.srcElement
    e.currentTarget = dom
    e.item = item

    // prevent default behaviour (by default)
    if (handler.call(tag, e) !== true) {
      e.preventDefault && e.preventDefault()
      e.returnValue = false
    }

    var el = item ? tag.parent : tag
    el.update()

  }

}

// used by if- attribute
function insertTo(root, node, before) {
  if (root) {
    root.insertBefore(before, node)
    root.removeChild(node)
  }
}

// item = currently looped item
function update(expressions, tag, item) {

  each(expressions, function(expr) {

    var dom = expr.dom,
        attr_name = expr.attr,
        value = tmpl(expr.expr, tag),
        parent = expr.dom.parentNode

    if (value == null) value = ''

    // leave out riot- prefixes from strings inside textarea
    if (parent && parent.tagName == 'TEXTAREA') value = value.replace(/riot-/g, '')

    // no change
    if (expr.value === value) return
    expr.value = value

    // text node
    if (!attr_name) return dom.nodeValue = value

    // remove original attribute
    remAttr(dom, attr_name)

    // event handler
    if (typeof value == 'function') {
      setEventHandler(attr_name, value, dom, tag, item)

    // if- conditional
    } else if (attr_name == 'if') {
      var stub = expr.stub

      // add to DOM
      if (value) {
        stub && insertTo(stub.parentNode, stub, dom)

      // remove from DOM
      } else {
        stub = expr.stub = stub || document.createTextNode('')
        insertTo(dom.parentNode, dom, stub)
      }

    // show / hide
    } else if (/^(show|hide)$/.test(attr_name)) {
      if (attr_name == 'hide') value = !value
      dom.style.display = value ? '' : 'none'

    // field value
    } else if (attr_name == 'value') {
      dom.value = value

    // <img src="{ expr }">
    } else if (attr_name.slice(0, 5) == 'riot-') {
      attr_name = attr_name.slice(5)
      value ? dom.setAttribute(attr_name, value) : remAttr(dom, attr_name)

    } else {
      if (expr.bool) {
        dom[attr_name] = value
        if (!value) return
        value = attr_name
      }

      if (typeof value != 'object') dom.setAttribute(attr_name, value)

    }

  })

}
function each(els, fn) {
  for (var i = 0, len = (els || []).length, el; i < len; i++) {
    el = els[i]
    // return false -> reomve current item during loop
    if (el != null && fn(el, i) === false) i--
  }
  return els
}

function remAttr(dom, name) {
  dom.removeAttribute(name)
}

// max 2 from objects allowed
function extend(obj, from, from2) {
  from && each(Object.keys(from), function(key) {
    obj[key] = from[key]
  })
  return from2 ? extend(obj, from2) : obj
}

function mkdom(template) {
  var tag_name = template.trim().slice(1, 3).toLowerCase(),
      root_tag = /td|th/.test(tag_name) ? 'tr' : tag_name == 'tr' ? 'tbody' : 'div',
      el = document.createElement(root_tag)

  el.stub = true
  el.innerHTML = template
  return el
}

function walk(dom, fn) {
  if (dom) {
    if (fn(dom) === false) walk(dom.nextSibling, fn)
    else {
      dom = dom.firstChild

      while (dom) {
        walk(dom, fn)
        dom = dom.nextSibling
      }
    }
  }
}

function arrDiff(arr1, arr2) {
  return arr1.filter(function(el) {
    return arr2.indexOf(el) < 0
  })
}

function inherit(parent) {
  function Child() {}
  Child.prototype = parent
  return new Child()
}



/*
 Virtual dom is an array of custom tags on the document.
 Updates and unmounts propagate downwards from parent to children.
*/

var virtual_dom = [],
    tag_impl = {}


function getTag(dom) {
  return tag_impl[dom.tagName.toLowerCase()]
}

function injectStyle(css) {
  var node = document.createElement('style')
  node.innerHTML = css
  document.head.appendChild(node)
}

function mountTo(root, tagName, opts) {
  var tag = tag_impl[tagName]

  if (tag && root) tag = new Tag(tag, { root: root, opts: opts })

  if (tag && tag.mount) {
    tag.mount()
    virtual_dom.push(tag)
    return tag.on('unmount', function() {
      virtual_dom.splice(virtual_dom.indexOf(tag), 1)
    })
  }

}

riot.tag = function(name, html, css, fn) {
  if (typeof css == 'function') fn = css
  else if (css) injectStyle(css)
  tag_impl[name] = { name: name, tmpl: html, fn: fn }
}

riot.mount = function(selector, tagName, opts) {
  if (selector == '*') selector = Object.keys(tag_impl).join(', ')
  if (typeof tagName == 'object') { opts = tagName; tagName = 0 }

  var tags = []

  function push(root) {
    var name = tagName || root.tagName.toLowerCase(),
        tag = mountTo(root, name, opts)

    if (tag) tags.push(tag)
  }

  // DOM node
  if (selector.tagName) {
    push(selector)
    return tags[0]

  // selector
  } else {
    each(document.querySelectorAll(selector), push)
    return tags
  }

}

// update everything
riot.update = function() {
  return each(virtual_dom, function(tag) {
    tag.update()
  })
}

// @deprecated
riot.mountTo = riot.mount


  
  // share methods for other riot parts, e.g. compiler
  riot.util = { brackets: brackets, tmpl: tmpl }

  // support CommonJS
  if (typeof exports === 'object')
    module.exports = riot

  // support AMD
  else if (typeof define === 'function' && define.amd)
    define(function() { return riot })

  // support browser
  else
    this.riot = riot

})();
riot.tag('tf-blend', '<div class="tf-badges"> <div class="tf-badge" riot-style="border-color: {this.type1.border}; background-color: rgba({this.type1.bg.r},{this.type1.bg.g},{this.type1.bg.b}, .3)"> <img riot-src="{this.type1.badge.image_medium}"> </div> <div class="tf-badge" riot-style="border-color: {this.type2.border};background-color: rgba({this.type2.bg.r},{this.type2.bg.g},{this.type2.bg.b}, .3)"> <img riot-src="{this.type2.badge.image_medium}"> </div> </div> <h2>{this.type1.name} / {this.type2.name}</h2> <div class="description">{this.description}</div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } tf-blend{ width: 100%; } tf-blend{ font-family: "Source Sans Pro"; padding: 10px; } tf-blend.ie{ font-family: "Helvetica Neue", Helvetica, Arial, "sans-serif"; } tf-blend div, img{ box-sizing: content-box; width: 100%; } tf-blend .tf-badge{ width: 22%; padding:12%; position: relative; border-radius: 50%; border: 3px solid; display: inline-block; } tf-blend .tf-badge:first-child{ margin-right: -4%; } tf-blend .tf-badge:last-child{ margin-left: -4%; } tf-blend .tf-badges{ width: 100%; max-width: 330px; margin: 0px auto; text-align:center; } tf-blend h2{ text-align: center; font-size: 25px; font-weight: 400; } .description{ max-width: 800px; margin: 0px auto; text-align: justify; }', function(opts) {var that;

this.assessmentId = this.root.getAttribute("assessment-id");

that = this;

window.Traitify.getPersonalityTypes(this.assessmentId).then(function(results) {
  var bgColor1, bgColor2, hexToRgb;
  that.type1 = results.personality_blend.personality_type_1;
  that.type2 = results.personality_blend.personality_type_2;
  hexToRgb = function(hex) {
    var result;
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      };
    } else {
      return null;
    }
  };
  bgColor1 = that.type1.badge.color_1;
  that.type1.bg = hexToRgb(bgColor1);
  that.type1.border = that.type1.badge.color_1;
  bgColor2 = that.type2.badge.color_1;
  that.type2.bg = hexToRgb(bgColor2);
  that.type2.border = that.type2.badge.color_1;
  that.description = results.personality_blend.description;
  return that.update();
});

});
; riot.tag('tf-traits', '<div class="tf-personality-traits"> <div each="{trait in this.traits}" class="tf-trait" riot-style="border-color:#{trait.badge.color_1}"> <div class="tf-name">{trait.name}</div> <div class="tf-definition">{trait.definition}</div> <div class="tf-background" riot-style="background-image:url({trait.badge.image_medium})"></div> </div> </div>', 'tf-traits .tf-personality-traits{ font-family: "Source Sans Pro"; } tf-traits div, tf-traits img{ box-sizing: content-box; } tf-traits .your-top-traits{ font-size: 24px; margin: 20px; text-align: center; } tf-traits .tf-personality-traits{ max-width:800px; margin:0px auto; text-align: center; } tf-traits .tf-trait{ border-top: 6px solid; border-color: #99aaff; display: inline-block; width: 180px; margin: 5px; vertical-align:top; background-color:#fff; height: 180px; position:relative; line-height: 1.2em; text-align:center; } tf-traits.ie .tf-trait{ height:280px; } @media (max-width: 768px) { tf-traits .personality-traits .tf-trait{ width:45%; } } tf-traits .tf-trait .tf-name{ margin: 20px 20px; margin-bottom: 0px; display: inline-block; font-weight: 600; text-align: left; } tf-traits.ie .personality-traits .tf-trait .tf-name{ display:block; text-align:center; } tf-traits .tf-trait .tf-definition{ padding: 0px 20px; margin-top: 10px; font-size:14px; font-weight: 400; text-align: left; } tf-traits .tf-trait .tf-background{ width: 80%; height: 80%; margin: 10%; top: 10px; position:absolute; background-size: contain; background-repeat: no-repeat; background-position: center center; opacity: .15 } tf-traits.ie .tf-trait .tf-background{ margin: 0px auto; width: 50px; height: 50px; position:relative; }', function(opts) {var that;

this.assessmentId = this.root.getAttribute("assessment-id");

that = this;

window.Traitify.getPersonalityTraits(this.assessmentId).then(function(results) {
  that.traits = results.slice(0, 8).map(function(trait) {
    var tf;
    tf = trait.personality_trait;
    tf.badge = tf.personality_type.badge;
    return tf;
  });
  return that.update();
});

});
; riot.tag('tf-types', '<div class="tf-types-scroller"> <div class="tf-types-container"> <div class="tf-types"> <div each="{type in this.types}" class="tf-type" onclick="{parent.handleClick}"> <div class="name" riot-style="color: #{type.badge.color_1}"> {type.name} </div> <img class="tf-badge" riot-src="{type.badge.image_medium}"> <div class="score"> {type.score} / 100 </div> </div> <div class="tf-arrow {this.arrow}"> <div class="tf-icon"></div> </div> </div> </div> </div> <div class="tf-description"> {this.description} </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-types-scroller{ overflow-y: hidden; overflow-x: auto; height: 220px; width: 100%; } .tf-types-container{ position: relative; background-color: #022946; font-family: "Source Sans Pro"; color: #fff; min-width: 910px; } tf-types .tf-arrow{ text-align: center; width: 130px; bottom: -20px; position: absolute; left: 0px; -webkit-transition: left .2s linear; -moz-transition: left .2s linear; -o-transition: left .2s linear; transition: left .2s linear; } tf-types .tf-arrow.position-1{ left: 130px; } tf-types .tf-arrow.position-2{ left: 260px; } tf-types .tf-arrow.position-3{ left: 390px; } tf-types .tf-arrow.position-4{ left: 520px; } tf-types .tf-arrow.position-5{ left: 650px; } tf-types .tf-arrow.position-6{ left: 780px; } tf-types .tf-arrow.position-7{ left: 910px; } tf-types .tf-arrow .tf-icon{ width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid transparent; border-top: 20px solid #022946; margin: 0px auto; } tf-types .tf-badge{ width: 60px; height: 60px; margin: 18px auto; } tf-types .tf-types{ width: 910px; margin: 0px auto; position: relative; } tf-types .tf-type{ display: inline-block; width: 130px; text-align: center; padding: 20px 0px; cursor: pointer; } tf-types .tf-description{ max-width: 800px; margin: 0px auto; font-family: "Source Sans Pro"; }', function(opts) {var that;

this.assessmentId = this.root.getAttribute("assessment-id");

that = this;

window.Traitify.getPersonalityTypes(this.assessmentId).then(function(results) {
  var hexToRgb;
  hexToRgb = function(hex) {
    var result;
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      };
    } else {
      return null;
    }
  };
  that.types = results.personality_types.map(function(i) {
    var score;
    score = Math.round(i.score);
    i = i.personality_type;
    i.score = score;
    return i;
  });
  that.description = that.types[0].description;
  that.handleClick = function() {
    that.description = this.type.description;
    that.arrow = "position-" + (that.types.indexOf(this.type));
    return that.update();
  };
  that.update();
  return console.log(that.handleClick);
});

});; 