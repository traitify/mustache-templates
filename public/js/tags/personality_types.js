riot.tag('tf-personality-types', '<div class="tf-types-container"> <div class="tf-types-scroller"> <div class="tf-types"> <div each="{type in this.currentTypes}" class="tf-type {type.active}" onclick="{parent.handleClick}"> <div class="tf-name-small">{type.name}</div> <div class="tf-badge-score-container" riot-style="border-color: #{type.badge.color_1}"> <img class="tf-badge" riot-src="{type.badge.image_medium}"> </div> <div class="tf-percent"> {type.score} / 100 </div> </div> <div class="tf-pointer" riot-style="left: {this.pointerPosition}px; background-color: #{this.pointerColor}"></div> </div> </div> <div class="tf-description"> {this.description} </div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-pointer{ margin-left: 20px; position: absolute; width: 86px; height: 10px; border-radius: 5px; -webkit-transition: all .4s ease-in-out; -moz-transition: all .4s ease-in-out; -o-transition: all .4s ease-in-out; transition: all .4s ease-in-out; } .tf-types-scroller{ width: 100%; overflow-x: auto; overflow-y: hidden; margin-bottom: 35px; text-align: center; } .tf-types-container{ font-family: "Source Sans Pro"; } .tf-types-container .tf-score{ border-bottom: 1px solid #fff; font-size: 22px; } .tf-types-container .tf-name{ font-size: 28px; margin-top: 15px; text-align: center; } .tf-types-container .tf-types .tf-name-small{ font-size: 16px; margin-top: 0px; } .tf-types-container .tf-badge{ width: 100%; } .tf-badge-score-background{ width: 100%; position: relative; height: 100%; opacity: .1; -webkit-backface-visibility: hidden; -moz-backface-visibility: hidden; } .tf-types-container .tf-badge-score-container{ border: 1px solid; width: 40px; height: 40px; position: relative; overflow: hidden; border-radius: 50%; padding: 22px; margin: 5px auto; -webkit-backface-visibility: hidden; -moz-backface-visibility: hidden; -webkit-transform: translate3d(0, 0, 0); -moz-transform: translate3d(0, 0, 0) } .tf-types-container .tf-type .tf-badge{ opacity: .9; } .tf-types-container .tf-percent{ -webkit-transition: all .4s ease-in-out; -moz-transition: all .4s ease-in-out; -o-transition: all .4s ease-in-out; transition: all .4s ease-in-out; position: relative; color: #bbb; } .tf-types-container .tf-badge-score-background{ width: 100%; height: 100%; opacity: .1; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)"; position: absolute; left: 0px; bottom: 0px; } .tf-types-container .tf-badge-score{ width: 100%; height: 0%; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"; position: absolute; left: 0px; bottom: 0px; -webkit-transition: all .2s ease-in-out; -moz-transition: all .2s ease-in-out; -o-transition: all .2s ease-in-out; transition: all .2s ease-in-out; opacity: .3; } .tf-types-container .tf-type.tf-active .tf-badge-score{ height: 100%; bottom: 0px } .tf-types-container .tf-type:hover .tf-percent{ width: 100%; color: #333; } .tf-types-container .tf-types{ margin: 0px auto; position: relative; display: inline-block; width:882px; margin-bottom: 10px; } .tf-types-container .tf-type{ text-align: center; cursor: pointer; display: inline-block; position: relative; display: inline-block; padding: 10px; margin: 0px 10px; } .tf-types-container .tf-description{ max-width: 600px; margin: 0px auto; text-align: justify; height: 130px; }', function(opts) {var that;

this.assessmentId = opts.assessmentId || this.root.getAttribute("assessment-id");

that = this;

that.initialize = function() {
  that.types = that.personality_types.map(function(i, index) {
    var score;
    score = Math.round(i.score);
    i = i.personality_type;
    i.score = score;
    i.position = index;
    i.height = 0;
    return i;
  });
  that.types[0].active = "tf-active";
  that.description = that.types[0].description;
  that.name = that.types[0].name;
  that.score = that.types[0].score;
  that.pointerPosition = 0;
  that.pointerColor = that.types[0].badge.color_1;
  that.currentTypes = that.types;
  that.handleClick = function(e) {
    e.preventDefault();
    that.description = this.type.description;
    that.types = that.types.map(function(type) {
      type.active = "";
      type.height = 0;
      return type;
    });
    that.pointerPosition = this.type.position * 126.15;
    that.pointerColor = this.type.badge.color_1;
    that.name = this.type.name;
    this.type.active = "tf-active";
    return that.update();
  };
  return that.update();
};

if (opts.personality_types) {
  that.personality_types = opts.personality_types;
  that.initialize();
} else if (this.assessmentId) {
  window.Traitify.getPersonalityTypes(this.assessmentId).then(function(results) {
    that.personality_types = results.personality_types;
    return that.initialize();
  });
}

});
