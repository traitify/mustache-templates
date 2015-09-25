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
