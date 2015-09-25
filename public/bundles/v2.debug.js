var ApiClient,SimplePromise,Traitify,console;Array.prototype.map||(Array.prototype.map=function(t,e){var r,n,o,i,s,a,u;if(o=void 0,r=void 0,i=void 0,"undefined"==typeof this||null===this)throw new TypeError(" this is null or not defined");if(n=Object(this),a=n.length>>>0,"function"!=typeof t)throw new TypeError(t+" is not a function");for(e&&(o=e),r=new Array(a),i=0;a>i;)s=void 0,u=void 0,i in n&&(s=n[i],u=t.call(o,s,i,n),r[i]=u),i++;return r}),Array.prototype.filter||(Array.prototype.filter=function(t){"use strict";var e,r,n,o,i,s;if(void 0===this||null===this)throw new TypeError;if(o=Object(this),r=o.length>>>0,"function"!=typeof t)throw new TypeError;for(n=[],i=arguments[1],e=0;r>e;)e in o&&(s=o[e],t.call(i,s,e,o)&&n.push(s)),e++;return n}),Array.prototype.indexOf||(Array.prototype.indexOf=function(t){var e,r;for(r=this.length>>>0,e=Number(arguments[1])||0,e=0>e?Math.ceil(e):Math.floor(e),0>e&&(e+=r);r>e;){if(e in this&&this[e]===t)return e;e++}return-1}),console||(console={log:function(){}}),Object.keys||(Object.keys=function(){"use strict";var t,e,r,n;return n=Object.prototype.hasOwnProperty,r=!{toString:null}.propertyIsEnumerable("toString"),t=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],e=t.length,function(o){var i,s,a;if("object"!=typeof o&&("function"!=typeof o||null===o))throw new TypeError("Object.keys called on non-object");a=[],s=void 0,i=void 0;for(s in o)n.call(o,s)&&a.push(s);if(r)for(i=0;e>i;)n.call(o,t[i])&&a.push(t[i]),i++;return a}}()),SimplePromise=function(t){var e;return e=Object(),e.then=function(t){return e.thenCallback=t,e.resolved&&e.thenCallback(e.data),e},e.resolved=!1,e.resolve=function(t){return e.data=t,e.thenCallback?e.thenCallback(t):e.resolved=!0,e},e["catch"]=function(t){return e.rejected?t(e.error):e.rejectCallback=t,e},e.rejected=!1,e.reject=function(t){return e.error=t,e.rejectCallback?e.rejectCallback(t):e.rejected=!0,e},t(e.resolve,e.reject),e},ApiClient=function(){function t(){this.host="https://api.traitify.com",this.version="v1",this.oldIE="undefined"!=typeof XDomainRequest?!0:!1,this.beautify=!1,this.XHR=XMLHttpRequest}return t.prototype.online=function(){return navigator.onLine},t.prototype.setBeautify=function(t){return this.beautify=t,this},t.prototype.setHost=function(t){return t.match(/http/)||(t="https://"+t),this.oldIE&&(t=t.replace("https://","").replace("http://",""),t=location.protocol+"//"+t),this.host=t,this},t.prototype.setPublicKey=function(t){return this.publicKey=t,this},t.prototype.setVersion=function(t){return this.version=t,this},t.prototype.ajax=function(t,e,r,n){var o,i,s,a,u,c,p,l;if(o=this.beautify,p=this.host+"/"+this.version+e,l=new this.XHR,"withCredentials"in l&&!this.oldIE)l.open(t,p,!0);else{if("undefined"==typeof XDomainRequest)return new SimplePromise(function(t,e){return e("CORS is Not Supported By This Browser")});this.oldIE&&(c=(new Date).getTime(),p+=-1===p.indexOf("?")?"?authorization="+this.publicKey+"&reset_cache="+c:"&authorization="+this.publicKey+"&reset_cache="+c),l=new XDomainRequest,l.open(t,p)}return l&&!this.oldIE&&(l.setRequestHeader("Authorization","Basic "+btoa(this.publicKey+":x")),l.setRequestHeader("Content-type","application/json"),l.setRequestHeader("Accept","application/json")),u=this,s=this.online(),i=this.oldIE,a=new SimplePromise(function(t,e){var a;if(u.reject=e,!s)return u.reject();try{return l.onload=function(){var e;return 404===l.status?u.reject(l.response):(e=i?l.responseText:l.response,o&&(e=e.replace(/_([a-z])/g,function(t,e){return e.toUpperCase()}).replace(/_/g,"")),e=JSON.parse(e),r&&r(e),u.resolve=t,u.resolve(e))},l.onprogress=function(){},l.ontimeout=function(){},l.onerror=function(){},window.setTimeout(function(){var t;try{return l.send(JSON.stringify(n))}catch(e){return t=e,u.reject(t)}},0),l}catch(c){return a=c,u.reject(a)}})},t.prototype.put=function(t,e,r){return this.oldIE?this.ajax("POST",t,r,e):this.ajax("PUT",t,r,e)},t.prototype.get=function(t,e){return this.ajax("GET",t,e,"")},t.prototype.getDecks=function(t){return this.get("/decks",t)},t.prototype.getSlides=function(t,e){return this.get("/assessments/"+t+"/slides",e)},t.prototype.addSlide=function(t,e,r,n,o){return this.put("/assessments/"+t+"/slides/"+e,{response:r,time_taken:n},o)},t.prototype.addSlides=function(t,e,r){return this.put("/assessments/"+t+"/slides",e,r)},t.prototype.getPersonalityTypes=function(t,e,r){var n,o,i,s,a;for(null==e&&(e=Object()),null==e.image_pack&&(e.image_pack="linear"),s=Array(),a=Object.keys(e),n=0,i=a.length;i>n;n++)o=a[n],s.push(o+"="+e[o]);return this.get("/assessments/"+t+"/personality_types?"+s.join("&"),r)},t.prototype.getPersonalityTraits=function(t,e,r){return this.get("/assessments/"+t+"/personality_traits/raw",r)},t.prototype.getCareers=function(t,e,r){var n,o,i,s,a;for(null==e&&(e=Object()),null==e.number_of_matches&&(e.number_of_matches=8),s=Array(),a=Object.keys(e),n=0,i=a.length;i>n;n++)o=a[n],s.push(o+"="+e[o]);return this.get("/assessments/"+t+"/matches/careers?"+s.join("&"),r)},t}(),Traitify=new ApiClient;
Traitify.host = "https://api-sandbox.traitify.com";

Traitify.setProduction = function(value) {
  if (value) {
    return this.host = "https://api.traitify.com";
  } else {
    return "https://api-sandbox.traitify.com";
  }
};

Traitify.version = "v1";

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false Mustache: true*/

(function defineMustache (global, factory) {
  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
    factory(exports); // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory); // AMD
  } else {
    global.Mustache = {};
    factory(Mustache); // script, wsh, asp
  }
}(this, function mustacheFactory (mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n')
            stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = '';
      break;
    case 0:
      match = '';
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit)
          break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null)
      tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null)
      return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.1.3';
  mustache.tags = [ '{{', '}}' ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render (template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html (template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));

Traitify.ui = {
  deviceType: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Phone" : "desktop"),
  widgets: Object(),
  widget: function(name, args) {
    return this.widgets[name] = args;
  },
  init: function(options) {
    var base, base1;
    if (options == null) {
      options = Object();
    }
    Traitify.ui.observable(options);
    if (options.slideDeck == null) {
      options.slideDeck = Object();
    }
    if ((base = options.slideDeck).target == null) {
      base.target = ".tf-slide-deck";
    }
    if ((base1 = options.slideDeck).tag == null) {
      base1.tag = "tf-slide-deck";
    }
    if (options.results == null) {
      options.results = Object();
    }
    if (options.publicKey) {
      Traitify.setPublicKey(options.publicKey);
    }
    delete options.publicKey;
    options.render = function() {
      var args, i, len, ref, scopes, slideDeck, that;
      that = this;
      scopes = "slides,blend,types,traits,career_matches";
      args = "image_pack=linear&data=" + scopes;
      ref = options.slideDeck;
      for (i = 0, len = ref.length; i < len; i++) {
        slideDeck = ref[i];
        slideDeck.assessmentId = options.assessmentId;
      }
      Traitify.get("/assessments/" + options.assessmentId + "?" + args).then(function(assessment) {
        var assessmentName, data, innerScript, j, k, l, len1, len2, len3, name, ref1, ref2, ref3, results, script, view, widget;
        if (assessment.completed_at === void 0) {
          options.slideDeck.mount = document.querySelector(options.slideDeck.target);
          widget = Traitify.ui.widgets[options.slideDeck.tag];
          data = Object();
          ref1 = Object.keys(assessment);
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            assessmentName = ref1[j];
            if (widget.data.indexOf(assessmentName) !== -1) {
              data[assessmentName] = assessment[assessmentName];
            }
          }
          view = Mustache.render(widget.template, assessment);
          options.slideDeck.mount.innerHTML = view;
          ref2 = widget.scripts;
          for (k = 0, len2 = ref2.length; k < len2; k++) {
            innerScript = ref2[k];
            script = document.createElement("script");
            script.innerHTML = innerScript;
            options.slideDeck.mount.appendChild(script);
          }
          options.slideDeck.mount.traitify.data = data;
          options.slideDeck.mount.traitify.assessmentId = assessment.id;
          options.slideDeck.mount.traitify.initialize();
          options.slideDeck.mount.traitify.mount = options.slideDeck.mount;
          return options.slideDeck.mount.traitify.on("finish", function() {
            return that.render();
          });
        } else {
          ref3 = Object.keys(assessment);
          results = [];
          for (l = 0, len3 = ref3.length; l < len3; l++) {
            name = ref3[l];
            widget = Traitify.ui.widgets[name];
            console.log("widget");
            console.log(Traitify.ui.widgets);
            results.push(console.log("/widget"));
          }
          return results;
        }
      });
      return this;
    };
    return options;
  },
  observable: function(options) {
    options.observable = {
      events: Object()
    };
    options.on = function(key, callback) {
      if (options.observable.events[key] == null) {
        return options.observable.events[key] = [callback];
      } else {
        return options.observable.events[key].push(callback);
      }
    };
    options.trigger = function(key, args) {
      var i, len, onEvent, ref, results;
      ref = options.observable.events[key];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        onEvent = ref[i];
        results.push(onEvent(args));
      }
      return results;
    };
    return options;
  }
};

Traitify.ui.widget("tf-slide-deck", {"data":["slides"],"template":"<div class=\"tf-slides\">\n  <div class=\"tf-slides-container\">\n    <div class=\"tf-progress-bar\">\n      <div class=\"tf-progress-bar-inner\"></div>\n    </div>\n    <div class=\"tf-caption\">\n    </div>\n    <div class=\"tf-slide tf-current\">\n    </div>\n    <div class=\"tf-slide tf-next\">\n    </div>\n  </div>\n  <div class=\"tf-me-not-me-container\">\n    <div class=\"tf-me\">Me</div>\n    <div class=\"tf-not-me\">Not Me</div>\n    <div class=\"tf-loading tf-hidden\">\n      <span class=\"tf-loading-content\">Loading...</span>\n      <span class=\"tf-click-content tf-hidden\">Click to reload!</span>\n    </div>\n  </div>\n</div>\n<style>\n  .tf-slides{\n    font-family: arial;\n    text-align:center;\n  }\n  .tf-progress-bar{\n    position: relative;\n    height: 12px;\n    width: 100%;\n    z-index:1;\n    background-color: rgba(150, 150, 150, .5);\n  }\n  .tf-hidden{\n    display: none;\n  }\n  .tf-progress-bar .tf-progress-bar-inner{\n    height: 100%;\n    width: 0%;\n    background-color: #fff;\n    border-radius: 0px 8px 8px 0px;\n    -webkit-transition: width .6s ease-in-out;\n    -moz-transition: width .6s ease-in-out;\n    -o-transition: width .6s ease-in-out;\n    transition: width .6s ease-in-out;\n  }\n  .tf-caption{\n    position: absolute;\n    color: #fff;\n    width:100%;\n    background-color: rgba(0, 0, 0, .7);\n    height: 48px;\n    line-height: 48px;\n    font-size: 20px;\n    z-index:1;\n  }\n  .tf-slides .tf-slide{\n    width: 100%;\n    height: 100%;\n    background-size: cover;\n    display: inline-block;\n    left: 0%;\n    top: 0px;\n    position: absolute;\n  }\n  .tf-slides .tf-slide.tf-current{\n    left: 0%;\n    -webkit-transition: left .6s ease-in-out;\n    -moz-transition: left .6s ease-in-out;\n    -o-transition: left .6s ease-in-out;\n    transition: left .6s ease-in-out;\n  }\n  .tf-slides .tf-slide.tf-next{\n    left: 100%;\n  }\n  .tf-slides .tf-slides-container{\n    height: 400px;\n    width: 100%;\n    position: relative;\n    overflow: hidden;\n  }\n  .tf-slides.min-width-720 .tf-slides-container {\n    height: 540px;\n  }\n  .tf-slides.min-width-1200 .tf-slides-container {\n    height: 700px;\n  }\n\n  .tf-me-not-me-container{\n    width: 280px;\n    margin: 0px auto;\n    height: 43px;\n    border-radius: 23px;\n    line-height: 43px;\n    text-align: center;\n    position: relative;\n    z-index: 1;\n    margin-top: -80px;\n    overflow: hidden;\n    cursor: pointer;\n  }\n  .tf-me, .tf-not-me{\n    font-size: 20px;\n    height: 100%;\n    display: inline-block;\n    position: relative;\n    width: 50%;\n    float: left;\n    color: #fff;\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n  }\n  .tf-me{\n    background-color: #00aeef;\n  }\n  .tf-me:active{\n    background-color: #0B659A;\n  }\n  .tf-not-me{\n    background-color: #ff5e5e;\n  }\n  .tf-not-me:active{\n    background-color: #961111;\n  }\n  .tf-slides.tf-loading .tf-loading{\n    display: block;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    background-color: #ff5e5e;\n    color: #fff;\n  }\n  .tf-slides.tf-loading .tf-loading .tf-loading-content{\n    -webkit-animation: fade-in-and-out 2s ease-out;\n    -webkit-animation-iteration-count: infinite; \n  }\n  @-webkit-keyframes fade-in-and-out {\n    0% { opacity: 0.0;}\n    50% { opacity: 1.0;}\n    100% { opacity: 0.0;}\n  }\n</style>\n","scripts":["\n    (function(me){\n      me.traitify = Object()\n\n      me.traitify.deferred = function(){\n        return {\n          thenCalls: Array(),\n          catchCalls: Array(),\n          then: function(callback){\n            if(this.triggered){\n              callback(this.args);\n            }else{\n              this.thenCalls.push(callback);\n            }\n          },\n          catch: function(callback){\n            if(this.triggered){\n              callback(this.args);\n            }else{\n              this.catchCalls.push(callback);\n            }\n          },\n          resolve: function(args){\n            if(this.thenCalls && this.thenCalls.length != 0){\n              for(i=0; i < this.thenCalls.length; i++){\n                this.thenCalls[i](args);\n              }\n            }else{\n              this.args = args;\n              this.triggered = true;\n            }\n          },\n          reject: function(args){\n            if(this.catchCalls.length != 0){\n              for(i=0; i < this.catchCalls.length; i++){\n                this.catchCalls[i](args);\n              }\n            }else{\n              this.args = args;\n              this.triggered = true;\n            }\n          }\n        }\n      }\n      me.traitify.Observable = function(item){\n        item.ons = Object()\n        item.on = function(key, callback){\n          if(!item.ons[key]){\n            item.ons[key] = Array();\n          }\n          item.ons[key].push(callback);\n        }\n        item.trigger = function(key, opts){\n          if(item.ons[key] && typeof item.ons[key].length != 0){\n            il = item.ons[key].length\n            for(i=0; i < il; i++){\n              item.ons[key][i](opts); \n            }\n          }\n        }\n        item.off = function(key){\n          item.ons[key] = Array();\n        }\n      }\n      me.traitify.Observable(me.traitify);\n      var i, undefined, el = document.createElement('div'),\n      transitions = {\n        'transition':'transitionend',\n        'OTransition':'otransitionend',  // oTransitionEnd in very old Opera\n        'MozTransition':'transitionend',\n        'WebkitTransition':'webkitTransitionEnd'\n      };\n\n      for (i in transitions) {\n        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {\n            transitionEnd = transitions[i];\n        }\n      }\n      var $TF = function(item){\n        if(typeof item == \"string\"){\n          item = me.querySelector(item);\n        }\n        if(Traitify.oldIE){\n          item.addEventListener = item.attachEvent;\n        }\n        item.hide = function(){\n          if(!this.className.match(/tf-hidden/)){\n            this.className = this.className + \" tf-hidden\";\n          }\n        }\n        item.show = function(){\n          this.className = this.className.replace(/ tf-hidden/, \"\");\n        }\n        return item;\n      }\n      me.traitify.slideResponses = Object();\n      me.traitify.lastResponse = new Date();\n      me.traitify.db = Object();\n      me.traitify.db.set = function(key, value){\n        key = me.traitify.assessmentId + \"-\" + key\n        return sessionStorage.setItem(key, JSON.stringify(value));\n      }\n      me.traitify.db.get = function(key){\n        key = me.traitify.assessmentId + \"-\" + key\n        return JSON.parse(sessionStorage.getItem(key));\n      }\n      me.traitify.initialize = function(){\n        self = $TF(this);\n        /*\n         * Set Available Nodes\n         */\n        this.nodes = Object()\n        this.nodes.currentSlide = $TF(\".tf-slide.tf-current\");\n        this.nodes.nextSlide = $TF(\".tf-slide.tf-next\");\n        this.nodes.caption = $TF(\".tf-caption\");\n        this.nodes.me = $TF(\".tf-me\");\n        this.nodes.notMe = $TF(\".tf-not-me\");\n        this.nodes.progressBarInner = $TF(\".tf-progress-bar-inner\");\n        this.nodes.slides = $TF(\".tf-slides\");\n        this.nodes.loading = $TF(\".tf-loading .tf-loading-content\");\n        this.nodes.clickToReload = $TF(\".tf-loading .tf-click-content\");\n\n\n        /*\n         * Set Data\n         */\n        this.data.unPlayedSlides = this.data.slides.filter(function(slide){\n          return !slide.completed_at && Object.keys(self.db.get(\"slideResponses\") || Object()).indexOf(slide.id) == -1\n        })\n        this.data.playedSlides = this.data.slides.filter(function(slide){\n          return slide.completed_at || Object.keys(self.db.get(\"slideResponses\") || Object()).indexOf(slide.id) != -1\n        })\n        this.data.slides = this.data.playedSlides.concat(this.data.unPlayedSlides)\n        this.index = this.data.playedSlides.length || 0\n\n        /*\n         * Resize\n         */\n        self.resizeTimer =  false;\n        window.addEventListener(\"resize\", function(){\n          if(self.resizeTimeout){\n            clearTimeout(self.resizeTimeout);\n          }\n\n          self.resizeTimeout = setTimeout(function(){\n            self.trigger(\"resize\");\n            self.resizeTimeout = false;\n          }, 300);\n        });\n\n        self.on(\"resize\", function(){\n          width = me.offsetWidth;\n          className = self.nodes.slides.className;\n          className = className.replace(/ min-width-1200/g, \"\");\n          className = className.replace(/ min-width-720/g, \"\");\n          className = className.replace(/ min-width-480/g, \"\");\n \n          if(width > 1200){\n            className += \" min-width-1200\";\n          } else if (width > 720){\n            className += \" min-width-720\";\n          } else{\n            className += \" min-width-480\";\n          }\n          self.nodes.slides.className = className;\n        })\n        self.trigger(\"resize\");\n\n        /*\n         * Transition\n         */\n        this.slideLock = false;\n        this.events = Object();\n        self.nodes.nextSlide.transitionend = function(){\n\n        }\n        self.nodes.nextSlide.addEventListener(transitionEnd, function(){\n          self.nodes.nextSlide.transitionend();\n        })\n\n        this.events.animate = function(){\n          if(!self.slideLock){\n            promise = self.deferred();\n            self.slideLock = true;\n            self.nodes.nextSlide.transitionend = function(){\n              self.slideLock = false;\n              promise.resolve();\n            }\n            self.nodes.nextSlide.className = self.nodes.nextSlide.className.replace(\"tf-next\", \"\") + \" tf-current\";\n            self.nodes.progressBarInner.style.width = Math.round((self.index / self.data.slides.length) * 100) + \"%\";\n            return promise;\n          }\n        }\n        self.nodes.progressBarInner.style.width = Math.round((self.index / self.data.slides.length) * 100) + \"%\";\n\n        /*\n         * Set Current Slide\n         */\n        this.events.setCurrentSlideData = function(){\n          if( self.data.slides.length - self.index == 0){\n            return true;\n          }\n\n          self.currentSlide = self.data.slides[self.index];\n          /*\n           * Set Caption\n           */\n          self.nodes.caption.innerHTML = self.currentSlide.caption;\n            \n          /*\n           * Set Image\n           */\n          self.nodes.currentSlide.style.backgroundImage = \"url(\" + self.currentSlide.image_desktop_retina + \")\";\n\n          /*\n           * Set Focus\n           */\n          backgroundPosition = self.currentSlide.focus_x + \"% \" + self.currentSlide.focus_y + \"%\";\n          self.nodes.currentSlide.style.backgroundPosition = backgroundPosition;            \n        }\n\n        /*\n         * Set Next Slide\n         */\n        this.events.setNextSlideData = function(){\n          if( self.data.slides.length - self.index <= 1){\n            return true;\n          }\n\n          self.nextSlide = self.data.slides[self.index + 1];\n          /*\n           * Set Image\n           */\n          self.nodes.nextSlide.style.backgroundImage = \"url(\" + self.nextSlide.image_desktop_retina + \")\";\n\n          /*\n           * Set Focus\n           */\n          backgroundPosition = self.nextSlide.focus_x + \"% \" + self.nextSlide.focus_y + \"%\";\n          self.nodes.nextSlide.style.backgroundPosition = backgroundPosition;\n        }\n\n        this.events.setNextSlideData();\n        this.events.setCurrentSlideData();\n\n        /*\n         * Advance Slide\n         */\n        this.events.advanceSlide = function(){\n          if(!self.slideLock){\n            if(((self.index - self.data.slides.length) <= 2 && self.index - self.data.slides.length != 0 ) || self.images[self.index + 2]){\n              self.index++\n              self.trigger(\"advanceSlide\", {value: true, slide: slide});\n\n              self.events.animate().then(function(){\n                self.events.setNextSlideData();\n                self.nodes.nextSlide.className = self.nodes.nextSlide.className.replace(\"tf-current\", \"\") + \" tf-next\";\n                self.events.setCurrentSlideData();\n              })\n            } else if(!self.nodes.slides.className.match(/tf-loading/)) {\n              self.nodes.slides.className += \" tf-loading\";\n            } \n          }\n        }\n        this.on(\"advanceSlide\", function(params){\n          slideResponses = self.db.get(\"slideResponses\") || Object();\n\n          slideResponses[params.slide.id] = {\n            value: params.value,\n            responseTime: new Date() - self.lastResponse\n          };\n\n          self.lastResponse = new Date();\n          self.db.set(\"slideResponses\", slideResponses);\n          self.trigger(\"setSlides\");\n        })\n\n        this.on(\"setSlides\", function(){\n          slideResponses = self.db.get(\"slideResponses\") || Object();\n\n          srl = Object.keys(slideResponses).length;\n\n          if(srl == self.data.slides.length){\n            slides = Object.keys(slideResponses).map(function(slideId){\n              return {\n                id: slideId,\n                response: slideResponses[slideId].value,\n                time_taken: slideResponses[slideId].responseTime\n              };\n            })\n            \n            Traitify.addSlides(self.assessmentId, slides).then(function(){\n              me.innerHTML = \"\";\n\n              self.trigger(\"finish\")\n            });\n          }\n        })\n\n        this.trigger(\"setSlides\");\n\n        /*\n         * Me Trigger\n         */\n        this.on(\"me\", function(){\n          slide = self.data.slides[self.index]\n\n          self.events.advanceSlide();\n        })\n\n        /*\n         * Not Me Trigger\n         */\n        this.on(\"notMe\",function(){\n          slide = self.data.slides[self.index]\n\n          self.events.advanceSlide();\n        })\n\n        /*\n         * Me\n         */\n        this.nodes.me.onclick = function(){ \n          self.trigger(\"me\")\n        }\n\n        /*\n         * Not Me\n         */\n        this.nodes.notMe.onclick = function(){\n          self.trigger(\"notMe\")\n        }\n\n        /*\n         * Gui For Preload Images\n         */\n        self.imageSize = \"image_desktop_retina\"\n        this.imageUrls = self.data.slides.map(function(slide){\n          return slide[self.imageSize];\n        })\n\n        this.nodes.clickToReload.onclick = function(){\n          self.trigger(\"clickReload\");\n        }\n        this.on(\"clickReload\", function(){\n          self.imageTries[self.images.lastIndex] = 0;\n          self.nodes.loading.show();\n          self.nodes.clickToReload.hide();\n          self.loadImage(self.images.lastIndex);\n        })\n\n        /*\n         * NASTY IMAGE PRELOADING\n         */\n        this.imageTries = Object()\n        this.images = Array();\n        self.images.lastIndex = this.index;\n\n        this.loadImage = function(i){\n          if(self.imageUrls[i]){\n            if(!self.imageTries[i]){\n              self.imageTries[i]= 0;\n            }\n            self.images[i] = new Image();\n            self.images[i].src = self.imageUrls[i];\n            self.images[i].onerror = function(){\n              self.imageTries[i]++;\n              if(self.imageTries[i] < 30){\n                setTimeout(function(){\n                  self.loadImage(i);\n                }, 1000)\n              }else{\n                self.images.lastIndex = i;\n                self.nodes.loading.hide();\n                self.nodes.clickToReload.show();\n              }\n            }\n            self.images[i].onload = function(){\n              setTimeout(function(){\n                self.loadImage(i + 1);\n              }, 300)\n              self.trigger(\"imageLoaded\");\n              self.nodes.clickToReload.hide();\n              self.images.lastIndex = i;\n\n              self.nodes.slides.className = self.nodes.slides.className.replace(\" tf-loading\", \"\");\n            }\n          }\n        }\n        this.loadImage(self.index);\n      }\n    })(document.currentScript.parentNode);\n"]})