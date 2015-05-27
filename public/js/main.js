Traitify.ui = {
  init: function(options) {
    var base, base1, base2;
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
    if ((base2 = options.slideDeck).options == null) {
      base2.options = Object();
    }
    if (options.results == null) {
      options.results = ["personality-blend", "personality-types", "personality-traits", "famous-people"].map(function(item) {
        return {
          target: ".tf-" + item,
          tag: "tf-" + item,
          dataName: item.replace(/-/g, "_")
        };
      });
    }
    options.load = function() {
      var args, scopes, that;
      that = this;
      scopes = "slides,blend,types,traits";
      args = "image_pack=linear&data=" + scopes;
      options.slideDeck.options.assessmentId = options.assessmentId;
      return Traitify.get("/assessments/" + options.assessmentId + "?" + args).then(function(assessment) {
        var base3, i, j, key, len, len1, ref, ref1, results, widget;
        if (assessment.completed_at === void 0) {
          options.slideDeck.options.slides = assessment.slides;
          if ((base3 = options.slideDeck.options).onFinished == null) {
            base3.onFinished = function(widget) {
              return that.load();
            };
          }
          return riot.mount(that.slideDeck.target, that.slideDeck.tag, that.slideDeck.options);
        } else {
          ref = that.results;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            widget = ref[i];
            if (widget.options == null) {
              widget.options = Object();
            }
            ref1 = Object.keys(assessment);
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              key = ref1[j];
              widget.options[key] = assessment[key];
            }
            results.push(riot.mount(widget.target, widget.tag, widget.options));
          }
          return results;
        }
      });
    };
    return options;
  },
  load: function(assessmentId, slideDeck, options) {
    var i, len, ref, widget, widgets;
    options.assessmentId = assessmentId;
    widgets = this.init(options);
    ref = widgets.slideDeck;
    for (i = 0, len = ref.length; i < len; i++) {
      widget = ref[i];
      widget.target = slideDeck;
    }
    widget.assessmentId = assessmentId;
    return widgets.load();
  }
};
