;Traitify.ui = {
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
    this.Observable(options);
    if (options.slideDeck == null) {
      options.slideDeck = Object();
    }
    if (options.slideDeck.target == null) {
      options.slideDeck.target = ".tf-slide-deck";
    }
    if (options.slideDeck.tag == null) {
      options.slideDeck.tag = "tf-slide-deck";
    }
    if (options.publicKey) {
      Traitify.setPublicKey(options.publicKey);
    }
    delete options.publicKey;
    options.render = function() {
      var that = this;
      var scopes = "slides,blend,types,traits,career_matches";
      var args = "image_pack=linear&data=" + scopes;
      var ref = options.slideDeck;
      for (i = 0, len = ref.length; i < len; i++) {
        slideDeck = ref[i];
        slideDeck.assessmentId = options.assessmentId;
      }
      Traitify.get("/assessments/" + options.assessmentId + "?" + args).then(function(assessment) {
        options.slideDeck.mount = document.querySelector(options.slideDeck.target);
        options.slideDeck.mount.innerHTML = "";
        if (assessment.completed_at === void 0) {
          var widget = Traitify.ui.widgets[options.slideDeck.tag];
          var data = Object();
          var ref1 = Object.keys(assessment);
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            var assessmentName = ref1[j];
            if (widget.data.indexOf(assessmentName) !== -1) {
              data[assessmentName] = assessment[assessmentName];
            }
          }
          var view = Mustache.render(widget.template, assessment);
          options.slideDeck.mount.innerHTML = view;
          var ref2 = widget.scripts;
          for (k = 0, len2 = ref2.length; k < len2; k++) {
            var innerScript = ref2[k];
            var script = document.createElement("script");
            script.type = 'text/javascript';
            script.text = innerScript;
            options.slideDeck.mount.appendChild(script);
          }
          options.slideDeck.mount.traitify.options = options;
          options.slideDeck.mount.traitify.data = data;
          options.slideDeck.mount.traitify.assessmentId = assessment.id;
          options.slideDeck.mount.traitify.initialize();
          options.on("slideDeck.finish", function() {
            return that.render();
          });
        } else {
          alert("hiya");
        }
      });
      return this;
    };
    return options;
  },
  Observable: function(options) {
    options.observable = {
      events: Array()
    };
    options.on = function(key, callback) {
      options.observable.events.push({
        name: key,
        callback: callback
      });
      return options;
    };
    options.trigger = function(keys, args) {
      var keys = keys.split(" ");
      var results = [];
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        var matcher = new RegExp(key.replace(/\s/g, "|"));
        var events = options.observable.events.filter(function(e) {
          return matcher.test(e.name);
        });
        results.push((function() {
          var results1 = [];
          for (j = 0; j < events.length; j++) {
            var onEvent = events[j];
            results1.push(onEvent.callback(args));
          }
          return results1;
        })());
      }
      return results;
    };
    return options;
  }
};
