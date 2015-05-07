riot.tag('tf-slide-deck', '<div class="tf-slide-deck-container"> <div class="tf-slides" riot-style="max-height: {this.maxHeight}px"> <div class="tf-info"> <div class="tf-progress-and-caption"> <div class="progress-bar-inner" riot-style="width:{this.progressBar}%"></div> <div class="caption">{this.panelOne.caption}</div> </div> </div> <div class="tf-slide tf-panel-one tf-{this.panelOne.class}" riot-style="background-image: url(\'{this.panelOne.picture}\'); background-position:{this.panelOne.x}% {this.panelOne.y}%;"> </div> <div class="tf-slide tf-panel-two tf-{this.panelTwo.class}" riot-style="background-image: url(\'{this.panelTwo.picture}\'); background-position:{this.panelOne.x}% {this.panelOne.y}%;"> </div> <div class="tf-response"> <div class="tf-me-not-me"> <a href="#" class="tf-me" onclick="{handleMe}"> ME </a> <a href="#" class="tf-not-me" onclick="{handleNotMe}"> NOT ME </a> </div> </div> </div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-info{ position: absolute; z-index: 1; width: 100%; } .tf-progress-and-caption{ margin: 15px auto; max-width: 450px; width: 90%; background-color: rgba(0,0,0, .8); border-radius: 28px; overflow: hidden; position: relative; } .tf-slides{ width:100%; max-width: 1200px; overflow: hidden; position: relative; height: 600px; font-family: "Source Sans Pro"; text-align: center; margin: 0px auto; } .tf-slide{ -webkit-transition: left .4s ease-in-out; -moz-transition: left .4s ease-in-out; -o-transition: left .4s ease-in-out; transition: left .4s ease-in-out; background-size: cover; } .tf-slides{ position: relative; } .tf-slide{ position: absolute; height: 100%; width: 100%; } .tf-slide.tf-next{ position: absolute; left: 100%; width: 100%; -moz-transition: none; -webkit-transition: none; -o-transition: color 0 ease-in; transition: none; } .tf-slide.tf-current{ left: 0%; } .caption{ padding: 0px 0px 5px; color: #fff; font-size: 28px; display: block; position:relative; z-index:1; } .tf-slide.tf-current.tf-panel-one{ -moz-transition: none; -webkit-transition: none; -o-transition: color 0 ease-in; transition: none; } .tf-slide.tf-last{ position: absolute; left: -100%; width: 100%; } .tf-response{ position: absolute; bottom: 20px; width: 100%; } .tf-me-not-me{ width: 260px; height: 46px; line-height:43px; font-size: 24px; left: 50%; padding: 0px; overflow: hidden; border-radius: 25px; margin: 0px auto; } .tf-me-not-me .tf-me, .tf-me-not-me .tf-not-me{ box-sizing: initial; float:left; } .tf-me-not-me .tf-me{ position: relative; background-color: #058FC4; width: 50%; display: inline-block; height: 100%; text-decoration: none; color: #fff; padding:0px; margin: 0px; } .tf-me-not-me .tf-not-me{ position: relative; background-color: #FF5E5E; width: 50%; display: inline-block; height: 100%; text-decoration: none; color: #fff; padding:0px; margin: 0px; } .progress-bar{ height: 100%; padding: 0px; width: 100%; } .progress-bar-inner{ position: absolute; background-color: rgba(120, 120, 120, .5); height: 100%; width: 0%; -webkit-transition: width .4s ease-in-out; -moz-transition: width .4s ease-in-out; -o-transition: width .4s ease-in-out; transition: width .4s ease-in-out; }', function(opts) {var that;

this.assessmentId = this.root.getAttribute("assessment-id") || opts.assessmentId;

that = this;

this.progressBar = "0";

this.panelOne = Object();

this.panelTwo = Object();

this.touchDevice = false;

this.processSlide = function(value) {
  if (this.images[this.index + 2]) {
    console.log("slides");
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
  }
};

this.handleMe = function() {
  if (!this.touchDevice) {
    return this.processSlide(true);
  }
};

this.handleNotMe = function() {
  if (!this.touchDevice) {
    return this.processSlide(false);
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
  this.panelOne.x = this.slides[this.index].focus_x;
  this.panelOne.y = this.slides[this.index].focus_y;
  this.panelTwo.caption = this.slides[this.index + 1].caption;
  this.panelTwo.picture = this.slides[this.index + 1].image_desktop_retina;
  this.panelTwo.x = this.slides[this.index + 1].fucus_x;
  this.panelTwo.y = this.slides[this.index + 1].focus_y;
  return this.update();
};

this.whichTransitionEvent = function() {
  var el, j, len, ref, t, transitions;
  el = document.createElement('fakeelement');
  transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };
  ref = Object.keys(transitions);
  for (j = 0, len = ref.length; j < len; j++) {
    t = ref[j];
    if (el.style[t] !== void 0) {
      return transitions[t];
    }
  }
};

this.transitionEvent = this.whichTransitionEvent();

this.index = 0;

this.initialize = function() {
  var el, images, loadImage;
  this.setSlide();
  el = document.getElementsByClassName("tf-panel-two")[0];
  this.transitionEvent && el.addEventListener(this.transitionEvent, function() {
    return that.onFinishedTransition();
  });
  images = this.slides.map(function(slide) {
    return slide.image_desktop_retina;
  });
  this.imageTries = Object();
  this.images = Object();
  loadImage = function(i) {
    var base;
    if (images[i]) {
      if ((base = that.imageTries)[i] == null) {
        base[i] = 0;
      }
      that.images[i] = new Image();
      that.images[i].src = images[i];
      that.images[i].onerror = function() {
        that.imageTries[i]++;
        if (that.imageTries[i] < 30) {
          return setTimeout(function() {
            return loadImage(i);
          }, 1000);
        }
      };
      return that.images[i].onload = function() {
        return loadImage(i + 1);
      };
    }
  };
  loadImage(0);
  this.touch(document.querySelector(".tf-me"), function() {
    return that.processSlide(true);
  });
  return this.touch(document.querySelector(".tf-not-me"), function() {
    return that.processSlide(false);
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

this.maxHeight = window.innerHeight;

document.addEventListener("orientationchange", function() {
  that.maxHeight = window.innerHeight;
  return that.update();
});

this.touch = function(target, callback) {
  (function() {
    var touchClick;
    touchClick = false;
    target.addEventListener('touchstart', (function() {
      that.touchDevice = true;
      touchClick = true;
    }), false);
    target.addEventListener('touchmove', (function() {
      touchClick = false;
    }), false);
    target.addEventListener('touchend', (function(e) {
      var event;
      if (touchClick) {
        touchClick = false;
        event = document.createEvent('CustomEvent');
        event.initCustomEvent('fastclick', true, true, e.target);
        e.target.dispatchEvent(event);
      }
    }), false);
  })();
  return target.addEventListener('fastclick', (function(e) {
    return callback();
  }), false);
};

});
