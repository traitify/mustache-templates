riot.tag('tf-slide-deck', '<div class="tf-slide-deck-container {this.finished}" if="{this.visible}"> <div class="tf-slides" riot-style="max-height: {this.maxHeight}px"> <div class="tf-info {this.infoVisible}"> <div class="tf-progress-and-caption"> <div class="progress-bar-inner" riot-style="width:{this.progressBar}%"></div> <div class="caption">{this.panelOne.caption}</div> </div> </div> <div class="tf-slide tf-panel-one tf-{this.panelOne.class}" riot-style="background-image: url(\'{this.panelOne.picture}\'); background-position:{this.panelOne.x}% {this.panelOne.y}%;"> </div> <div class="tf-slide tf-panel-two tf-{this.panelTwo.class}" riot-style="background-image: url(\'{this.panelTwo.picture}\'); background-position:{this.panelTwo.x}% {this.panelTwo.y}%;"> </div> <div class="tf-response"> <div class="tf-me-not-me"> <div class="tf-loading {this.loadingVisible}"> <a href="#" class="tf-refresh {this.refreshVisible}" onclick="{handleRefresh}"> Click To Refresh </a> <span class="tf-loading-animation {this.hideLoading}">Loading...</span> </div> <a href="#" class="tf-me" onclick="{handleMe}"> ME </a> <a href="#" class="tf-not-me" onclick="{handleNotMe}"> NOT ME </a> </div> </div> </div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-cover{ background-color: #fff; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 2; } .tf-info{ position: absolute; z-index: 1; width: 100%; } .tf-progress-and-caption{ margin: 15px auto; max-width: 450px; width: 90%; background-color: rgba(15,84,34, .8); border-radius: 28px; overflow: hidden; position: relative; } .tf-slide-deck-container{ -webkit-transition: all .4s ease-in-out; -moz-transition: all .4s ease-in-out; -o-transition: all .4s ease-in-out; transition: all .4s ease-in-out; } .tf-slide-deck-container.tf-finished{ height: 0px; overflow: hidden; opacity: 0; } .tf-slides{ width:100%; max-width: 1200px; overflow: hidden; position: relative; height: 600px; font-family: "Source Sans Pro"; text-align: center; margin: 0px auto; background-color: #4488cc; } .tf-slide{ -webkit-transition: left .4s ease-in-out; -moz-transition: left .4s ease-in-out; -o-transition: left .4s ease-in-out; transition: left .4s ease-in-out; background-size: cover; } .tf-slides{ position: relative; } .tf-slide{ position: absolute; height: 100%; width: 100%; } .tf-slide.tf-next{ position: absolute; left: 100%; width: 100%; -moz-transition: none; -webkit-transition: none; -o-transition: color 0 ease-in; transition: none; } .tf-slide.tf-current{ left: 0%; } .caption{ padding: 3px 0px 8px; color: #fff; font-size: 28px; display: block; position:relative; z-index:1; } .tf-slide.tf-current.tf-panel-one{ -moz-transition: none; -webkit-transition: none; -o-transition: color 0 ease-in; transition: none; } .tf-slide.tf-last{ position: absolute; left: -100%; width: 100%; } .tf-response{ position: absolute; bottom: 20px; width: 100%; } .tf-me-not-me{ width: 320px; height: 46px; position: relative; line-height:43px; font-size: 24px; padding: 0px; overflow: hidden; border-radius: 25px; margin: 0px auto; } .tf-finished .tf-loading{ background-color: #315F9B; color: #fff; -webkit-transition: all .4s ease-in-out; -moz-transition: all .4s ease-in-out; -o-transition: all .4s ease-in-out; transition: all .4s ease-in-out; } .tf-me-not-me .tf-me, .tf-me-not-me .tf-not-me{ box-sizing: initial; float:left; } .tf-me-not-me .tf-me{ position: relative; background-color: #1dafec; width: 50%; display: inline-block; height: 100%; text-decoration: none; color: #fff; padding:0px; margin: 0px; } .tf-me-not-me .tf-not-me{ position: relative; background-color: #fc5f62; width: 50%; display: inline-block; height: 100%; text-decoration: none; color: #fff; padding:0px; margin: 0px; } .progress-bar{ height: 100%; padding: 0px; width: 100%; } .progress-bar-inner{ position: absolute; background-color: rgba(39,235,95, .8); height: 100%; width: 0%; -webkit-transition: width .4s ease-in-out; -moz-transition: width .4s ease-in-out; -o-transition: width .4s ease-in-out; transition: width .4s ease-in-out; } .tf-refresh{ background-color: #4488cc; height: 100%; width: 100%; color: #fff; display: none; text-decoration: none; } .tf-loading{ background-color: #4488cc; height: 100%; width: 100%; position: absolute; z-index: 1; display: none; color: #fff; } .tf-finished .tf-response{ bottom: 50%; margin-bottom: -22px; -webkit-transition: bottom .4s ease-in-out; -moz-transition: bottom .4s ease-in-out; -o-transition: bottom .4s ease-in-out; transition: bottom .4s ease-in-out; } .tf-slide-deck .tf-me:active{ background-color: #2684AB; } .tf-slide-deck .tf-not-me:active{ background-color: #D74648; } .tf-visible{ display: block; } .tf-loading-animation{ -webkit-animation-name: fadeInOut; -webkit-animation-duration: 3s; -webkit-animation-iteration-count: infinite; animation-name: fadeInOut; animation-duration: 3s; animation-iteration-count: infinite; } .tf-invisible{ display: none; } @keyframes fadeInOut { 0% { opacity:1; } 45% { opacity:1; } 55% { opacity:0; } 80% { opacity:0; } 100%{ opacity:1 } } @-webkit-keyframes fadeInOut { 0% { opacity:1; } 45% { opacity:1; } 55% { opacity:0; } 80% { opacity:0; } 100%{ opacity:1 } }', function(opts) {var Cookie, slideTime, that;

this.assessmentId = this.root.getAttribute("assessment-id") || opts.assessmentId;

that = this;

this.panelOne = Object();

this.panelTwo = Object();

Cookie = Object();

Cookie.set = function(cname, cvalue, exdays) {
  var d, expires;
  d = new Date;
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  expires = 'expires=' + d.toUTCString();
  document.cookie = ("tf" + that.assessmentId + cname + "=") + JSON.stringify(cvalue) + '; ' + expires;
};

Cookie.get = function(cname) {
  var c, ca, i, name;
  name = "tf" + that.assessmentId + cname + "=";
  ca = document.cookie.split(';');
  i = 0;
  while (i < ca.length) {
    c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return JSON.parse(c.substring(name.length, c.length));
    }
    i++;
  }
  return void 0;
};

this.touchDevice = false;

slideTime = new Date();

this.processSlide = function(value) {
  var customSlides, duration, j, len, sendSlides, slide, slideIds, slides;
  that.trigger("addSlide");
  duration = new Date() - slideTime;
  slideTime = new Date();
  this.slideData[this.slides[this.index].id] = {
    id: this.slides[this.index].id,
    time_taken: duration,
    response: value
  };
  Cookie.set("slideData", this.slideData);
  if (this.images[this.index + 2] || (this.index === this.slides.length - 2 && this.images[this.index + 1])) {
    if (this.transitionEvent) {
      this.animateSlide();
      this.onFinishedTransition = function() {
        that.trigger("transitionEnd");
        this.panelOne.picture = this.panelTwo.picture;
        this.panelOne.x = this.panelTwo.x;
        this.panelOne.y = this.panelTwo.y;
        this.update();
        that.panelTwo["class"] = "next";
        that.panelOne["class"] = "current";
        that.index++;
        return that.setSlide();
      };
    } else {
      this.index++;
      this.setSlide();
    }
  } else {
    this.loadingVisible = "tf-visible";
  }
  if (this.index === this.slides.length - 1) {
    slides = Object.keys(this.slideData).map(function(id) {
      return that.slideData[id];
    });
    slideIds = this.allSlides.map(function(slide) {
      return slide.id;
    });
    sendSlides = Array();
    customSlides = Array();
    for (j = 0, len = slides.length; j < len; j++) {
      slide = slides[j];
      if (slideIds.indexOf(slide.id) !== -1) {
        sendSlides.push(slide);
      } else {
        if (that.customSlideValues == null) {
          that.customSlideValues = Array();
        }
        that.customSlideValues.push(slide);
      }
    }
    that.trigger("customSlideValues", that.customSlideValues);
    Traitify.addSlides(that.assessmentId, sendSlides).then(function(response) {
      console.log("mine mine");
      return opts.trigger("slideDeck.finish", that);
    });
    this.infoVisible = "tf-invisible";
    this.finished = "tf-finished";
    this.panelOne.picture = "";
    this.progress;
  }
  return this.setProgressBar();
};

this.setProgressBar = function() {
  return this.progressBar = (Object.keys(this.slideData).length / this.allSlides.length) * 100;
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

this.handleRefresh = function() {
  this.refreshVisible = "";
  this.loadingVisible = "tf-visible";
  this.imageTries[this.index + 1] = 0;
  return this.loadImage(this.index + 1);
};

this.panelOne["class"] = "current";

this.panelTwo["class"] = "next";

this.animateSlide = function() {
  this.progressBar = (this.slideData.length / this.allSlides.length) * 100;
  return this.panelTwo["class"] = "current";
};

this.setSlide = function() {
  var slideOne, slideTwo;
  slideOne = this.slides[this.index];
  this.panelOne.caption = slideOne.caption;
  this.panelOne.picture = slideOne.image_desktop_retina;
  this.panelOne.x = slideOne.focus_x;
  this.panelOne.y = slideOne.focus_y;
  if (this.slides[this.index + 1]) {
    slideTwo = this.slides[this.index + 1];
    this.panelTwo.caption = slideTwo.caption;
    this.panelTwo.picture = slideTwo.image_desktop_retina;
    this.panelTwo.y = slideTwo.focus_y;
    this.panelTwo.x = slideTwo.focus_x;
  }
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

opts.on("slideDeck.initialized", function() {
  var el, j, len, ref, slide;
  el = document.getElementsByClassName("tf-panel-two")[0];
  that.transitionEvent && el.addEventListener(that.transitionEvent, function() {
    return that.onFinishedTransition();
  });
  that.touch(document.querySelector(".tf-me"), function() {
    return that.processSlide(true);
  });
  that.touch(document.querySelector(".tf-not-me"), function() {
    return that.processSlide(false);
  });
  if (that.customSlides == null) {
    that.customSlides = Array();
  }
  ref = that.customSlides;
  for (j = 0, len = ref.length; j < len; j++) {
    slide = ref[j];
    that.slides.splice(slide.position, slide);
  }
  that.update();
  return opts.on("slideDeck.initialized");
});

this.on("mount", function() {
  that.mounted = true;
  if (that.initialized === true) {
    return opts.trigger("slideDeck.initialized");
  }
});

this.initialize = function() {
  var images, playedSlideIds;
  this.index = 0;
  this.visible = true;
  this.update();
  this.slideData = Cookie.get("slideData");
  if (!this.slideData) {
    this.slideData = Object();
  }
  this.allSlides = this.slides.map(function(slide) {
    return slide;
  });
  playedSlideIds = Object.keys(this.slideData).map(function(slideName) {
    return that.slideData[slideName].id;
  });
  this.slides = this.slides.filter(function(slide) {
    return playedSlideIds.indexOf(slide.id) === -1;
  });
  this.setSlide();
  this.setProgressBar();
  images = this.slides.map(function(slide) {
    return slide.image_desktop_retina;
  });
  this.imageTries = Object();
  this.images = Object();
  this.loadImage = function(i) {
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
            return that.loadImage(i);
          }, 1000);
        } else {
          that.refreshVisible = "tf-visible";
          that.hiddenRefresh = "tf-invisible";
          return that.update();
        }
      };
      return that.images[i].onload = function() {
        that.loadingVisible = "";
        that.update();
        return that.loadImage(i + 1);
      };
    }
  };
  this.loadImage(0);
  that.initialized = true;
  if (that.mounted === true) {
    return opts.trigger("slideDeck.initialized");
  }
};

this.maxHeight = window.innerHeight;

document.addEventListener("orientationchange", function() {
  that.maxHeight = window.innerHeight;
  return that.update();
});

this.setCustomSlides = function(slides) {
  return this.customSlides = slides;
};

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
