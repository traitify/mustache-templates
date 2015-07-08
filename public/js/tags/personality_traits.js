riot.tag('tf-personality-traits', '<div class="tf-personality-traits-container" if="{this.visible}"> <div each="{trait in this.traits}" class="tf-trait" riot-style="border-color:#{trait.badge.color_1}"> <div class="tf-background-color" riot-style="background-color: #{trait.badge.color_1}"></div> <div class="tf-name">{trait.name}</div> <div class="tf-definition">{trait.definition}</div> <div class="tf-background" riot-style="background-image:url({trait.badge.image_medium})"></div> </div> </div>', '.tf-personality-traits-container .tf-background-color{ opacity: .03; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; } .tf-personality-traits-container div, .tf-personality-traits-container img{ box-sizing: content-box; } .tf-personality-traits-container .your-top-traits{ font-size: 24px; margin: 20px; text-align: center; } .tf-personality-traits-container{ max-width:800px; margin:0px auto; text-align: center; font-family: "Source Sans Pro"; } .tf-personality-traits-container .tf-trait{ border-top: 6px solid; border-color: #99aaff; display: inline-block; max-width: 180px; width: 45%; margin: 5px; vertical-align:top; background-color:#fff; height: 180px; position:relative; line-height: 1.2em; text-align:center; } .tf-personality-traits-container.ie .tf-trait{ height:280px; } @media (max-width: 768px) { tf-traits .personality-traits .tf-trait{ width:45%; } } .tf-personality-traits-container .tf-trait .tf-name{ margin: 20px 20px; margin-bottom: 0px; display: inline-block; font-weight: 600; text-align: center; } @media (max-width: 768px) { .tf-personality-traits-container .tf-trait .tf-name{ margin: 20px auto; } } .tf-personality-traits-container .tf-trait .tf-definition{ padding: 0px 20px; margin-top: 10px; font-size:14px; font-weight: 400; text-align: left; } .tf-personality-traits-container .tf-trait .tf-background{ width: 52px; height: 52px; right: 20px; bottom: 20px; position:absolute; background-size: contain; background-repeat: no-repeat; background-position: center center; opacity: .15; -webkit-transition: all .2s ease-in-out; -moz-transition: all .2s ease-in-out; -o-transition: all .2s ease-in-out; transition: all .2s ease-in-out; } .tf-personality-traits-container .tf-trait:hover .tf-background{ opacity:.8; }', function(opts) {var that;

this.assessmentId = opts.assessmentId || this.root.getAttribute("assessment-id");

this.mounted = true;

if (this.initialized) {
  opts.trigger("personalityTraits.initialized");
}

that = this;

this.initialize = function() {
  if (this.personality_traits) {
    that.traits = this.personality_traits;
  }
  that.visible = true;
  that.traits = that.traits.slice(0, 8).map(function(trait) {
    var tf;
    tf = trait.personality_trait;
    tf.badge = tf.personality_type.badge;
    return tf;
  });
  that.update();
  this.initialized = true;
  if (this.mounted) {
    return opts.trigger("personalityTraits.initialized");
  }
};

if (this.personality_traits) {
  that.initialize();
} else if (this.assessmentId) {
  window.Traitify.getPersonalityTraits(this.assessmentId).then(function(results) {
    that.traits = results.personality_traits;
    return that.initialize();
  });
}

});
