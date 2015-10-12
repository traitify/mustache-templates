Traitify.ui.widget("personality-types", {"name":"personality-types","data":["personality-types"],"template":"<div class=\"tf-types\">\n  {{#types}} \n    <div class=\"tf-type\">\n      {{name}}\n    </div>\n  {{/types}}\n</div>\n","scripts":["\n  (function(me){\n      me.traitify = Object()\n\n      me.traitify.Observable = function(item){\n        item.ons = Object()\n        item.on = function(key, callback){\n          if(!item.ons[key]){\n            item.ons[key] = Array();\n          }\n          item.ons[key].push(callback);\n        }\n        item.trigger = function(key, opts){\n          if(item.ons[key] && typeof item.ons[key].length != 0){\n            il = item.ons[key].length\n            for(i=0; i < il; i++){\n              item.ons[key][i](opts); \n            }\n          }\n        }\n        item.off = function(key){\n          item.ons[key] = Array();\n        }\n      }\n      me.traitify.Observable(me.traitify);\n\n      var $TF = function(item){\n        if(typeof item == \"string\"){\n          item = me.querySelector(item);\n        }\n        if(Traitify.oldIE){\n          item.addEventListener = item.attachEvent;\n        }\n        item.hide = function(){\n          if(!this.className.match(/tf-hidden/)){\n            this.className = this.className + \" tf-hidden\";\n          }\n        }\n        item.show = function(){\n          this.className = this.className.replace(/ tf-hidden/, \"\");\n        }\n        return item;\n      }\n\n      me.traitify.slideResponses = Object();\n      me.traitify.lastResponse = new Date();\n      me.traitify.db = Object();\n      me.traitify.db.set = function(key, value){\n        key = me.traitify.assessmentId + \"-\" + key\n        return sessionStorage.setItem(key, JSON.stringify(value));\n      }\n      me.traitify.db.get = function(key){\n        key = me.traitify.assessmentId + \"-\" + key\n        return JSON.parse(sessionStorage.getItem(key));\n      }\n      me.traitify.initialize = function(){\n\n      })\n  })(document.currentScript.parentNode)\n"]})