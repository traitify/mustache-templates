riot.tag('tf-types', '<div class="tf-types-scroller"> <div class="tf-types-container"> <div class="tf-types"> <div each="{type in this.types}" class="tf-type" onclick="{parent.handleClick}"> <div class="name" riot-style="color: #{type.badge.color_1}"> {type.name} </div> <img class="tf-badge" riot-src="{type.badge.image_medium}"> <div class="score"> {type.score} / 100 </div> </div> <div class="tf-arrow {this.arrow}"> <div class="tf-icon"></div> </div> </div> </div> </div> <div class="tf-description"> {this.description} </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-types-scroller{ overflow-y: hidden; overflow-x: auto; height: 220px; width: 100%; } .tf-types-container{ position: relative; background-color: #022946; font-family: "Source Sans Pro"; color: #fff; min-width: 910px; } tf-types .tf-arrow{ text-align: center; width: 130px; bottom: -20px; position: absolute; left: 0px; -webkit-transition: left .2s linear; -moz-transition: left .2s linear; -o-transition: left .2s linear; transition: left .2s linear; } tf-types .tf-arrow.position-1{ left: 130px; } tf-types .tf-arrow.position-2{ left: 260px; } tf-types .tf-arrow.position-3{ left: 390px; } tf-types .tf-arrow.position-4{ left: 520px; } tf-types .tf-arrow.position-5{ left: 650px; } tf-types .tf-arrow.position-6{ left: 780px; } tf-types .tf-arrow.position-7{ left: 910px; } tf-types .tf-arrow .tf-icon{ width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid transparent; border-top: 20px solid #022946; margin: 0px auto; } tf-types .tf-badge{ width: 60px; height: 60px; margin: 18px auto; } tf-types .tf-types{ width: 910px; margin: 0px auto; position: relative; } tf-types .tf-type{ display: inline-block; width: 130px; text-align: center; padding: 20px 0px; cursor: pointer; } tf-types .tf-description{ max-width: 800px; margin: 0px auto; font-family: "Source Sans Pro"; }', function(opts) {var that;

this.assessmentId = this.root.getAttribute("assessment-id");

that = this;

if (this.assessmentId) {
  window.Traitify.getPersonalityTypes(this.assessmentId).then(function(results) {
    var hexToRgb;
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
    that.types = results.personality_types.map(function(i) {
      var score;
      score = Math.round(i.score);
      i = i.personality_type;
      i.score = score;
      return i;
    });
    that.description = that.types[0].description;
    that.handleClick = function() {
      that.description = this.type.description;
      that.arrow = "position-" + (that.types.indexOf(this.type));
      return that.update();
    };
    that.update();
    return console.log(that.handleClick);
  });
}

});
