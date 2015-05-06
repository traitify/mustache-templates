<tf-slide-deck>
  <div class="tf-slide-deck-container">
    <div class="tf-slides">
      <div class="progress-bar">
        <div class="progress-bar-inner" style="width:{this.progressBar}%"></div>
      </div>
      <div class="tf-slide tf-panel-one tf-{this.panelOne.class}" style="background-image: url('{this.panelOne.picture}')">
        <div class="caption">{this.panelOne.caption}</div>
      </div>
      <div class="tf-slide tf-panel-two tf-{this.panelTwo.class}" style="background-image: url('{this.panelTwo.picture}')">
        <div class="caption">{this.panelTwo.caption}</div>
      </div>
      <div class="tf-me-not-me-container">
        <a href="#" class="tf-me" onclick={handleMe}>
          ME
        </a>
        <a href="#" class="tf-not-me" onclick={handleNotMe}>
          NOT ME
        </a>
      </div>
    </div>
  </div>
  <style>
    @font-face {
      font-family: "Source Sans Pro";
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro'), local('Source Sans Pro'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format('woff');
    }
    .tf-slides{
      width:100%;
      overflow: hidden;
      position: relative;
      height: 600px;
      font-family: "Source Sans Pro";
      text-align: center;
    }
    .tf-slide{
      -webkit-transition: left .4s ease-in-out;
      -moz-transition: left .4s ease-in-out;
      -o-transition: left .4s ease-in-out;
      transition: left .4s ease-in-out;
      background-size: cover;
    }
    .tf-slides{
      position: relative;
    }
    .tf-slide{
      position: absolute;
      height: 100%;
      width: 100%;
    }
    .tf-slide.tf-next{
      position: absolute;
      left: 100%;
      width: 100%;
      -moz-transition: none;
      -webkit-transition: none;
      -o-transition: color 0 ease-in;
      transition: none;
    }
    .tf-slide.tf-current{
      left: 0%;
    }
    .tf-slide .caption{
      padding: 10px;
      background-color: rgba(0,0,0, .5);
      color: #fff;
      font-size: 32px;
    }
    .tf-slide.tf-current.tf-panel-one{
      -moz-transition: none;
      -webkit-transition: none;
      -o-transition: color 0 ease-in;
      transition: none;
    }
    .tf-slide.tf-last{
      position: absolute;
      left: -100%;
      width: 100%;
    }
    .tf-me-not-me-container{
      position: absolute;
      bottom: 10px;
      width: 30%;
      height: 50px;
      line-height:46px;
      font-size: 24px;
      left: 50%;
      margin-left: -15%;
      padding: 0px;
      overflow: hidden;
      border-radius: 25px;
    }
    .tf-me-not-me-container .tf-me, .tf-me-not-me-container .tf-not-me{
      box-sizing: initial;
      float:left;
    }
    .tf-me-not-me-container .tf-me{
      position: relative;
      background-color: #058FC4;
      width: 50%;
      display: inline-block;
      height: 100%;
      text-decoration: none;
      color: #fff;
      padding:0px;
      margin: 0px;
    }
    .tf-me-not-me-container .tf-not-me{
      position: relative;
      background-color: #FF5E5E;
      width: 50%;
      display: inline-block;
      height: 100%;
      text-decoration: none;
      color: #fff;
      padding:0px;
      margin: 0px;
    }
    .progress-bar{
      position: absolute;
      height:10px;
      width: 100%;
      background-color: rgba(255, 255, 255, .5);
      z-index: 1;
    }
    .progress-bar .progress-bar-inner{
      background-color: #fff;
      height: 100%;
      width: 0%;
      border-radius: 0px 5px 5px 0px;
      -webkit-transition: width .4s ease-in-out;
      -moz-transition: width .4s ease-in-out;
      -o-transition: width .4s ease-in-out;
      transition: width .4s ease-in-out;
    }
  </style>
  <script>
    @assessmentId = @root.getAttribute("assessment-id") || opts.assessmentId
    that = this
    @progressBar = "0"
    @panelOne = Object()
    @panelTwo = Object()

    @handleMe = ->
      if @whichTransitionEvent
        @animateSlide()
        @onFinishedTransition = ->
          @panelOne.picture = @panelTwo.picture
          @panelTwo.class = "next"
          @panelOne.class = "current"
          @index++
          @setSlide()
      else
        @index++
        @setSlide()

    @handleNotMe = ->
      if @whichTransitionEvent
        @animateSlide()
        @onFinishedTransition = ->
          @panelOne.picture = @panelTwo.picture
          @panelTwo.class = "next"
          @panelOne.class = "current"
          @index++
          @setSlide()
      else
        @index++
        @setSlide()

    @panelOne.class = "current"
    @panelTwo.class = "next"

    @animateSlide = ->
      @progressBar = ((@index + 1) / @slides.length) * 100
      @panelTwo.class = "current"

    @setSlide = ->
      @panelOne.caption = @slides[@index].caption
      @panelOne.picture = @slides[@index].image_desktop_retina
      @panelTwo.caption = @slides[@index + 1].caption
      @panelTwo.picture = @slides[@index + 1].image_desktop_retina
      @update()

    @whichTransitionEvent = ->
        el = document.createElement('fakeelement')
        transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        }

        for t in Object.keys(transitions)
            if el.style[t] != undefined
                return transitions[t]



    @transitionEvent = @whichTransitionEvent()

    @index = 0
    @initialize = ->
      @setSlide()
      el = document.getElementsByClassName("tf-panel-two")[0]

      @transitionEvent && el.addEventListener(@transitionEvent, ->
        that.onFinishedTransition()
      );

    if opts.slides
      @slides = opts.slides
      @initialize()
    else if @assessmentId
      window.Traitify.getSlides(@assessmentId).then((slides)->
        that.slides = slides
        that.initialize()
      )
  </script>
</tf-slide-deck>
