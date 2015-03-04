riot.tag('blend', '<div class="badges"> <div class="badge" riot-style="border-color: {this.type1.border}; background-color: rgba({this.type1.bg.r},{this.type1.bg.g},{this.type1.bg.b}, .3)"> <img riot-src="{this.type1.badge.image_medium}"> </div> <div class="badge" riot-style="border-color: {this.type2.border};background-color: rgba({this.type2.bg.r},{this.type2.bg.g},{this.type2.bg.b}, .3)"> <img riot-src="{this.type2.badge.image_medium}"> </div> </div> <h2>{this.type1.name} / {this.type2.name}</h2> <div class="description">{this.description}</div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } @font-face{ font-family: "Adelle Sans Bold"; font-style: bold; font-weight: 800; src: local("Adelle Sans Bold"), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/adelle-sans-bold.woff") format("woff"); } @font-face{ font-family: "Adelle Sans"; font-style: normal; font-weight: 400; src: local("Adelle Sans"), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/adelle-sans.woff") format("woff"); } blend{ width: 100%; } blend{ font-family: "Source Sans Pro"; padding: 10px; } blend.ie{ font-family: "Helvetica Neue", Helvetica, Arial, "sans-serif"; } blend div, img{ box-sizing: content-box; width: 100%; } blend .badge{ width: 23%; padding:12%; position: relative; border-radius: 50%; border: 3px solid; display: inline-block; } blend .badge:first-child{ margin-right: -6%; } blend .badge:last-child{ margin-right: -3%; } blend .badges{ width: 100%; max-width: 400px; margin: 0px auto; } blend h2{ text-align: center; font-size: 30px; } .description{ max-width: 800px; margin: 0px auto; text-align: justify; }', function(opts) {var that;

this.assessmentId = this.root.getAttribute("assessment-id");

that = this;

Traitify.setPublicKey(this.root.getAttribute("public-key"));

Traitify.setHost(this.root.getAttribute("host") || "api-sandbox.traitify.com");

Traitify.setVersion("v1");

Traitify.getPersonalityTypes(this.assessmentId).then(function(results) {
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
