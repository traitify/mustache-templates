Traitify.ui = {
  init: function(options) {
    var base, base1, base2, base3, dataName, i, item, len, ref;
    if (options == null) {
      options = Object();
    }
    if (options.slideDeck == null) {
      options.slideDeck = Object();
    }
    if ((base = options.slideDeck).target == null) {
      base.target = ".tf-slide-deck";
    }
    if ((base1 = options.slideDeck).tag == null) {
      base1.tag = "tf-slide-deck";
    }
    options.slideDeck = riot.mount(options.slideDeck.target, options.slideDeck.tag);
    ref = ["personality-blend", "personality-types", "personality-traits", "famous-people", "careers"];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      dataName = item.replace(/-([a-z])/g, function(g) {
        return g[1].toUpperCase();
      });
      if (options[item] == null) {
        options[item] = Object();
      }
      if ((base2 = options[item]).tag == null) {
        base2.tag = "tf-" + item;
      }
      if ((base3 = options[item]).target == null) {
        base3.target = ".tf-" + item;
      }
      options[dataName] = riot.mount(".tf-" + item, options[item].tag);
    }
    options.load = function() {
      var args, scopes, that;
      that = this;
      scopes = "slides,blend,types,traits,career_matches";
      args = "image_pack=linear&data=" + scopes;
      options.slideDeck.assessmentId = options.assessmentId;
      Traitify.get("/assessments/" + options.assessmentId + "?" + args).then(function(assessment) {
        var deck, j, k, key, len1, len2, ref1, ref2, results, results1, widget;
        if (assessment.completed_at === void 0) {
          ref1 = options.slideDeck;
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            deck = ref1[j];
            deck.slides = assessment.slides;
            deck.on("finish", function() {
              return that.load();
            });
            results.push(deck.initialize());
          }
          return results;
        } else {
          ref2 = that.results;
          results1 = [];
          for (k = 0, len2 = ref2.length; k < len2; k++) {
            widget = ref2[k];
            results1.push((function() {
              var l, len3, ref3, results2;
              ref3 = Object.keys(assessment);
              results2 = [];
              for (l = 0, len3 = ref3.length; l < len3; l++) {
                key = ref3[l];
                widget[key] = assessment[key];
                widget.assessmentId = assessment.id;
                results2.push(widget.initialize());
              }
              return results2;
            })());
          }
          return results1;
        }
      });
      return this;
    };
    return options;
  },
  on: function(event, callback) {}
};
