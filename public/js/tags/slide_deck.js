riot.tag('tf-slide-deck', '<div class="tf-slide-deck-container"> <div class="tf-slides"> <div class="progress-bar"> <div class="progress-bar-inner" riot-style="width:{this.progressBar}%"></div> </div> <div class="tf-slide tf-panel-one tf-{this.panelOne.class}" riot-style="background-image: url(\'{this.panelOne.picture}\')"> <div class="caption">{this.panelOne.caption}</div> </div> <div class="tf-slide tf-panel-two tf-{this.panelTwo.class}" riot-style="background-image: url(\'{this.panelTwo.picture}\')"> <div class="caption">{this.panelTwo.caption}</div> </div> <div class="tf-me-not-me-container"> <a href="#" class="tf-me" onclick="{handleMe}"> ME </a> <a href="#" class="tf-not-me" onclick="{handleNotMe}"> NOT ME </a> </div> </div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-slides{ width:100%; overflow: hidden; position: relative; height: 600px; font-family: "Source Sans Pro"; text-align: center; } .tf-slide{ -webkit-transition: left .4s ease-in-out; -moz-transition: left .4s ease-in-out; -o-transition: left .4s ease-in-out; transition: left .4s ease-in-out; background-size: cover; } .tf-slides{ position: relative; } .tf-slide{ position: absolute; height: 100%; width: 100%; } .tf-slide.tf-next{ position: absolute; left: 100%; width: 100%; -moz-transition: none; -webkit-transition: none; -o-transition: color 0 ease-in; transition: none; } .tf-slide.tf-current{ left: 0%; } .tf-slide .caption{ padding: 10px; background-color: rgba(0,0,0, .5); color: #fff; font-size: 32px; } .tf-slide.tf-current.tf-panel-one{ -moz-transition: none; -webkit-transition: none; -o-transition: color 0 ease-in; transition: none; } .tf-slide.tf-last{ position: absolute; left: -100%; width: 100%; } .tf-me-not-me-container{ position: absolute; bottom: 10px; width: 30%; height: 50px; line-height:46px; font-size: 24px; left: 50%; margin-left: -15%; padding: 0px; overflow: hidden; border-radius: 25px; } .tf-me-not-me-container .tf-me, .tf-me-not-me-container .tf-not-me{ box-sizing: initial; float:left; } .tf-me-not-me-container .tf-me{ position: relative; background-color: #058FC4; width: 50%; display: inline-block; height: 100%; text-decoration: none; color: #fff; padding:0px; margin: 0px; } .tf-me-not-me-container .tf-not-me{ position: relative; background-color: #FF5E5E; width: 50%; display: inline-block; height: 100%; text-decoration: none; color: #fff; padding:0px; margin: 0px; } .progress-bar{ position: absolute; height:10px; width: 100%; background-color: rgba(255, 255, 255, .5); z-index: 1; } .progress-bar .progress-bar-inner{ background-color: #fff; height: 100%; width: 0%; border-radius: 0px 5px 5px 0px; -webkit-transition: width .4s ease-in-out; -moz-transition: width .4s ease-in-out; -o-transition: width .4s ease-in-out; transition: width .4s ease-in-out; }', function(opts) {var that;

this.assessmentId = this.root.getAttribute("assessment-id") || opts.assessmentId;

that = this;

this.progressBar = "0";

this.panelOne = Object();

this.panelTwo = Object();

this.handleMe = function() {
  if (this.whichTransitionEvent) {
    this.animateSlide();
    return this.onFinishedTransition = function() {
      this.panelOne.picture = this.panelTwo.picture;
      this.panelTwo["class"] = "next";
      this.panelOne["class"] = "current";
      this.index++;
      return this.setSlide();
    };
  } else {
    this.index++;
    return this.setSlide();
  }
};

this.handleNotMe = function() {
  if (this.whichTransitionEvent) {
    this.animateSlide();
    return this.onFinishedTransition = function() {
      this.panelOne.picture = this.panelTwo.picture;
      this.panelTwo["class"] = "next";
      this.panelOne["class"] = "current";
      this.index++;
      return this.setSlide();
    };
  } else {
    this.index++;
    return this.setSlide();
  }
};

this.panelOne["class"] = "current";

this.panelTwo["class"] = "next";

this.animateSlide = function() {
  this.progressBar = ((this.index + 1) / this.slides.length) * 100;
  return this.panelTwo["class"] = "current";
};

this.setSlide = function() {
  this.panelOne.caption = this.slides[this.index].caption;
  this.panelOne.picture = this.slides[this.index].image_desktop_retina;
  this.panelTwo.caption = this.slides[this.index + 1].caption;
  this.panelTwo.picture = this.slides[this.index + 1].image_desktop_retina;
  return this.update();
};

this.whichTransitionEvent = function() {
  var el, i, len, ref, t, transitions;
  el = document.createElement('fakeelement');
  transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };
  ref = Object.keys(transitions);
  for (i = 0, len = ref.length; i < len; i++) {
    t = ref[i];
    if (el.style[t] !== void 0) {
      return transitions[t];
    }
  }
};

this.transitionEvent = this.whichTransitionEvent();

this.index = 0;

this.initialize = function() {
  var el;
  this.setSlide();
  el = document.getElementsByClassName("tf-panel-two")[0];
  return this.transitionEvent && el.addEventListener(this.transitionEvent, function() {
    return that.onFinishedTransition();
  });
};

if (opts.slides) {
  this.slides = opts.slides;
  this.initialize();
} else if (this.assessmentId) {
  window.Traitify.getSlides(this.assessmentId).then(function(slides) {
    that.slides = slides;
    return that.initialize();
  });
}

});
