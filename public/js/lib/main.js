Traitify.ui = {
  init: function(options) {
    var base, base1, base2, base3, base4, dataName, i, item, len, ref;
    if (options == null) {
      options = Object();
    }
    riot.observable(options);
    if (options.slideDeck == null) {
      options.slideDeck = Object();
    }
    if ((base = options.slideDeck).target == null) {
      base.target = ".tf-slide-deck";
    }
    if ((base1 = options.slideDeck).tag == null) {
      base1.tag = "tf-slide-deck";
    }
    ref = ["personality-blend", "personality-types", "personality-traits", "famous-people", "careers"];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      dataName = item.replace(/-([a-z])/g, function(g) {
        return g[1].toUpperCase();
      });
      if (options == null) {
        options = Object();
      }
      if (options.results == null) {
        options.results = Object();
      }
      if ((base2 = options.results)[dataName] == null) {
        base2[dataName] = Object();
      }
      if ((base3 = options.results[dataName]).tag == null) {
        base3.tag = "tf-" + item;
      }
      if ((base4 = options.results[dataName]).target == null) {
        base4.target = ".tf-" + item;
      }
    }
    options.load = function() {
      var args, j, len1, ref1, scopes, slideDeck, that;
      that = this;
      scopes = "slides,blend,types,traits,career_matches";
      args = "image_pack=linear&data=" + scopes;
      ref1 = options.slideDeck;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        slideDeck = ref1[j];
        slideDeck.assessmentId = options.assessmentId;
      }
      Traitify.get("/assessments/" + options.assessmentId + "?" + args).then(function(assessment) {
        var k, key, l, len2, len3, ref2, ref3, resultName, results, widget;
        if (assessment.completed_at === void 0) {
          options.slideDeck.mount = riot.mount(options.slideDeck.target, options.slideDeck.tag, options)[0];
          options.slideDeck.mount.slides = assessment.slides;
          options.on("slideDeck.finish", function() {
            return that.load();
          });
          return options.slideDeck.mount.initialize();
        } else {
          ref2 = Object.keys(that.results);
          results = [];
          for (k = 0, len2 = ref2.length; k < len2; k++) {
            resultName = ref2[k];
            widget = that.results[resultName];
            that.results[resultName].mount = riot.mount(widget.target, widget.tag, options)[0];
            that.results[resultName].mount.assessmentId = that.assessmentId;
            ref3 = Object.keys(assessment);
            for (l = 0, len3 = ref3.length; l < len3; l++) {
              key = ref3[l];
              that.results[resultName].mount[key] = assessment[key];
            }
            results.push(that.results[resultName].mount.initialize());
          }
          return results;
        }
      });
      return this;
    };
    return options;
  },
  on: function(event, callback) {}
};
