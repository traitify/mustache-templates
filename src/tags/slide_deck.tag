<tf-slide-deck>
  <div class="tf-slide-deck-container">
    <div class="tf-slides" style="max-height: {this.maxHeight}px">
      <div class="tf-info">
        <div class="tf-progress-and-caption">
            <div class="progress-bar-inner" style="width:{this.progressBar}%"></div>
          <div class="caption">{this.panelOne.caption}</div>
        </div>
      </div>
      <div class="tf-slide tf-panel-one tf-{this.panelOne.class}" style="background-image: url('{this.panelOne.picture}'); background-position:{this.panelOne.x}% {this.panelOne.y}%;">
      </div>
      <div class="tf-slide tf-panel-two tf-{this.panelTwo.class}" style="background-image: url('{this.panelTwo.picture}'); background-position:{this.panelOne.x}% {this.panelOne.y}%;">
      </div>
      <div class="tf-response">
        <div class="tf-me-not-me">
          <a href="#" class="tf-me" onclick={handleMe}>
            ME
          </a>
          <a href="#" class="tf-not-me" onclick={handleNotMe}>
            NOT ME
          </a>
        </div>
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
    .tf-info{
      position: absolute;
      z-index: 1;
      width: 100%;
    }
    .tf-progress-and-caption{
      margin: 15px auto;
      max-width: 450px;
      width: 90%;
      background-color: rgba(0,0,0, .8);
      border-radius: 28px;
      overflow: hidden;
      position: relative;
    }
    .tf-slides{
      width:100%;
      max-width: 1200px;
      overflow: hidden;
      position: relative;
      height: 600px;
      font-family: "Source Sans Pro";
      text-align: center;
      margin: 0px auto;
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
    .caption{
      padding: 0px 0px 5px;
      color: #fff;
      font-size: 28px;
      display: block;
      position:relative;
      z-index:1;
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
    .tf-response{
      position: absolute;
      bottom: 20px;
      width: 100%;
    }
    .tf-me-not-me{
      width: 260px;
      height: 46px;
      line-height:43px;
      font-size: 24px;
      left: 50%;
      padding: 0px;
      overflow: hidden;
      border-radius: 25px;
      margin: 0px auto;
    }
    .tf-me-not-me .tf-me, .tf-me-not-me .tf-not-me{
      box-sizing: initial;
      float:left;
    }
    .tf-me-not-me .tf-me{
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
    .tf-me-not-me .tf-not-me{
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
      height: 100%;
      padding: 0px;
      width: 100%;
    }
    .progress-bar-inner{
      position: absolute;
      background-color: rgba(120, 120, 120, .5);
      height: 100%;
      width: 0%;
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

    @touchDevice = false

    @processSlide = (value)->
      if @images[@index + 2]
        console.log("slides")
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

    @handleMe = ->
      if !@touchDevice
        @processSlide(true)
    @handleNotMe = ->
      if !@touchDevice
        @processSlide(false)

    @panelOne.class = "current"
    @panelTwo.class = "next"

    @animateSlide = ->
      @progressBar = ((@index + 1) / @slides.length) * 100
      @panelTwo.class = "current"

    @setSlide = ->
      @panelOne.caption = @slides[@index].caption
      @panelOne.picture = @slides[@index].image_desktop_retina
      @panelOne.x = @slides[@index].focus_x
      @panelOne.y = @slides[@index].focus_y
      @panelTwo.caption = @slides[@index + 1].caption
      @panelTwo.picture = @slides[@index + 1].image_desktop_retina
      @panelTwo.x = @slides[@index + 1].fucus_x
      @panelTwo.y = @slides[@index + 1].focus_y
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
      )

      images = @slides.map((slide)->
        slide.image_desktop_retina
      )
      @imageTries = Object()
      @images = Object()
      loadImage = (i)->
        if images[i]
          that.imageTries[i] ?= 0
          that.images[i] = new Image()
          that.images[i].src = images[i]
          that.images[i].onerror = ->
            that.imageTries[i]++
            if that.imageTries[i] < 30
              setTimeout(->
                loadImage(i)
              , 1000)

          that.images[i].onload = ->
            loadImage(i + 1)
      loadImage(0)

      @touch(document.querySelector(".tf-me"), ->
        that.processSlide(true)
      )

      @touch(document.querySelector(".tf-not-me"), ->
        that.processSlide(false)
      )

    if opts.slides
      @slides = opts.slides
      @initialize()
    else if @assessmentId
      window.Traitify.getSlides(@assessmentId).then((slides)->
        that.slides = slides
        that.initialize()
      )
    @maxHeight = window.innerHeight
    document.addEventListener("orientationchange", ->
      that.maxHeight = window.innerHeight
      that.update()
    )

    @touch = (target, callback)->
      do ->
        touchClick = false
        target.addEventListener 'touchstart', (->
          that.touchDevice = true
          touchClick = true
          return
        ), false
        target.addEventListener 'touchmove', (->
          touchClick = false
          return
        ), false
        target.addEventListener 'touchend', ((e) ->
          if touchClick
            touchClick = false
            # Send fast click.
            event = document.createEvent('CustomEvent')
            event.initCustomEvent 'fastclick', true, true, e.target
            e.target.dispatchEvent event
          return
        ), false
        return

      target.addEventListener('fastclick', ((e) ->
          callback()
      ), false)
  </script>
</tf-slide-deck>
