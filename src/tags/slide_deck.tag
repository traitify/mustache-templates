<tf-slide-deck>
  <div class="tf-slide-deck-container {this.finished}" if={this.visible}>
    <div class="tf-slides" style="max-height: {this.maxHeight}px">
      <div class="tf-progress-bar tf-vertical"><div class="tf-progress-bar-inner" style="height:{this.progressBar}%; {this.progressBarColor}"></div></div>
      <div class="tf-progress-bar"><div class="tf-progress-bar-inner" style="width:{this.progressBar}%; {this.progressBarColor}"></div></div>
      <div class="tf-info {this.infoVisible}">
        <div class="tf-progress-and-caption">
          <div class="tf-progress-bar"><div class="tf-progress-bar-inner" style="width:{this.progressBar}%; {this.progressBarColor}"></div></div>
          <div class="tf-caption">{this.panelOne.caption}</div>
        </div>
      </div>
      <div class="tf-slide tf-panel-one tf-{this.panelOne.class}" style="background-image: url('{this.panelOne.picture}'); background-position:{this.panelOne.x}% {this.panelOne.y}%;">
      </div>
      <div class="tf-slide tf-panel-two tf-{this.panelTwo.class}" style="background-image: url('{this.panelTwo.picture}'); background-position:{this.panelTwo.x}% {this.panelTwo.y}%;">
      </div>
      <div class="tf-response">
        <div class="tf-progress-bar"><div class="tf-progress-bar-inner" style="width:{this.progressBar}%; {this.progressBarColor}"></div></div>
        <div class="tf-me-not-me">
          <div class="tf-loading {this.loadingVisible}">
            <a href="#" class="tf-refresh {this.refreshVisible}" onclick={handleRefresh}>
              Click To Refresh
            </a>
            <span class="tf-loading-animation {this.hideLoading}">Loading...</span>
          </div>
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
    .tf-progress-bar{
      display: none;
    }
    .tf-progress-and-caption .tf-progress-bar{
      display: block;
    }
    .tf-cover{
      background-color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
    }
    .tf-progress-bar.tf-vertical{
      height: 100%;
      width: 30px;
      position: absolute;
      z-index: 1;
    }
    .tf-progress-bar.tf-vertical .tf-progress-bar-inner{
      width: 100%;
      border-radius: 15px 15px 0px 0px;
      bottom: 0px;
      position: absolute;
      -webkit-transition: height .4s ease-in-out;
      -moz-transition: height .4s ease-in-out;
      -o-transition: height .4s ease-in-out;
      transition: height .4s ease-in-out;
    }
    .tf-info{
      position: absolute;
      z-index: 1;
      width: 100%;
    }
    .tf-progress-and-caption{
      margin: 0px 0px;
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    .tf-slide-deck-container.tf-finished{
      height: 0;
      overflow: hidden;
      opacity: 0;
    }
    .tf-slides{
      width:100%;
      max-width: 1200px;
      overflow: hidden;
      position: relative;
      height: 600px;
      font-family: "Source Sans Pro", Arial, Verdana, sans-serif;
      text-align: center;
      margin: 0 auto;
      background-color: #4488cc;
    }
    .tf-slide{
      -webkit-transition: left .5s ease-in-out;
      -moz-transition: left .5s ease-in-out;
      -o-transition: left .5s ease-in-out;
      transition: left .5s ease-in-out;
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
    .tf-caption{
      padding: 3px 0px 8px;
      color: #fff;
      font-size: 28px;
      display: block;
      position:relative;
      z-index:1;
      background-color: rgba(0, 0, 0, .6);
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
      width: 320px;
      height: 46px;
      position: relative;
      line-height:43px;
      font-size: 24px;
      padding: 0;
      overflow: hidden;
      border-radius: 25px;
      margin: 0 auto;
    }
    .tf-finished .tf-loading{
      background-color: #315F9B;
      color: #fff;
      -webkit-transition: all .4s ease-in-out;
      -moz-transition: all .4s ease-in-out;
      -o-transition: all .4s ease-in-out;
      transition: all .4s ease-in-out;
    }

    .tf-me-not-me .tf-me, .tf-me-not-me .tf-not-me{
      box-sizing: initial;
      float:left;
    }
    .tf-me-not-me .tf-me{
      position: relative;
      background-color: #1dafec;
      width: 50%;
      display: inline-block;
      height: 100%;
      text-decoration: none;
      color: #fff;
      padding:0;
      margin: 0;
    }
    .tf-me-not-me .tf-not-me{
      position: relative;
      background-color: #fc5f62;
      width: 50%;
      display: inline-block;
      height: 100%;
      text-decoration: none;
      color: #fff;
      padding:0;
      margin: 0;
    }
    .tf-progress-bar{
      height: 10px;
      padding: 0px;
      width: 100%;
      background-color: rgba(255, 255, 255, .5)
    }
    .tf-progress-bar-inner{
      position: relative;
      height: 100%;
      width: 0%;
      background-color: #fff;
      border-radius: 0px 5px 5px 0px;
      -webkit-transition: width .4s ease-in-out;
      -moz-transition: width .4s ease-in-out;
      -o-transition: width .4s ease-in-out;
      transition: width .4s ease-in-out;
    }
    .tf-refresh{
      background-color: #4488cc;
      height: 100%;
      width: 100%;
      color: #fff;
      display: none;
      text-decoration: none;
    }
    .tf-loading{
      background-color: #4488cc;
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 1;
      display: none;
      color: #fff;
    }
    .tf-finished .tf-response{
      bottom: 50%;
      margin-bottom: -22px;
      -webkit-transition: bottom .4s ease-in-out;
      -moz-transition: bottom .4s ease-in-out;
      -o-transition: bottom .4s ease-in-out;
      transition: bottom .4s ease-in-out;
    }
    .tf-slide-deck .tf-me:active{
      background-color: #2684AB;
    }
    .tf-slide-deck .tf-not-me:active{
      background-color: #D74648;
    }
    .tf-visible{
      display: block;
    }
    .tf-loading-animation{
      -webkit-animation-name: fadeInOut;
      -webkit-animation-duration: 3s;
      -webkit-animation-iteration-count: infinite;
      animation-name: fadeInOut;
      animation-duration: 3s;
      animation-iteration-count: infinite;
    }
    .tf-invisible{
      display: none;
    }

    @keyframes fadeInOut {
      0% {
        opacity:1;
      }
      45% {
        opacity:1;
      }
      55% {
        opacity:0;
      }
      80% {
        opacity:0;
      }
      100%{
        opacity:1
      }
    }
    @-webkit-keyframes fadeInOut {
      0% {
        opacity:1;
      }
      45% {
        opacity:1;
      }
      55% {
        opacity:0;
      }
      80% {
        opacity:0;
      }
      100%{
        opacity:1
      }
    }
  </style>
  <script>
    @assessmentId = @root.getAttribute("assessment-id") || opts.assessmentId
    that = this
    that.imageName = if Traitify.ui.deviceType == "desktop" then "image_desktop_retina" else "image_desktop"
    @panelOne = Object()
    @panelTwo = Object()
    @progressBarColor = "background-color: #{opts.slideDeck.progressBarColor}" if opts.slideDeck.progressBarColor

    DB = {
      get: (key)->
        value = window.sessionStorage.getItem(key)
        JSON.parse(value) if value && value.length != 0
      set: (key, value)->
        window.sessionStorage.setItem(key, JSON.stringify(value))
      del: (key)->
        window.sessionStorage.removeItem(key)
    }


    @touchDevice = false
    slideTime = new Date()
    @processSlide = (value)->
      that.trigger("slideDeck.addSlide")
      duration = new Date() - slideTime
      slideTime = new Date()
      @slideData[@slides[@index].id] = {
        id: @slides[@index].id,
        time_taken: duration,
        response: value
      }

      DB.set("#{that.assessmentId}slideData", @slideData)
      if @images[@index + 2] || (@index == @slides.length - 2 && @images[@index + 1])
        if @transitionEvent
          @animateSlide()
          @onFinishedTransition = ->
            that.trigger("transitionEnd")
            @index++
            @setSlide()
        else
          @index++
          @setSlide()
      else
        @loadingVisible = "tf-visible"

      if @index == @slides.length - 1
        slides = Object.keys(@slideData).map((id)->
          that.slideData[id]
        )
        slideIds = @allSlides.map((slide)-> slide.id)
        sendSlides = Array()
        customSlides = Array()
        for slide in slides
          if slideIds.indexOf(slide.id) != -1
            sendSlides.push(slide)
          else
            that.customSlideValues ?= Array()
            that.customSlideValues.push(slide)
        that.trigger("customSlideValues", that.customSlideValues)
        Traitify.addSlides(that.assessmentId, sendSlides).then((response)->
          opts.trigger("slideDeck.finish", that)
          DB.del("#{that.assessmentId}slideData")
        )
        @infoVisible = "tf-invisible"
        @finished = "tf-finished"
        @panelOne.picture = ""
        @progress
      @setProgressBar()
    @setProgressBar = ->
      @progressBar = (Object.keys(@slideData).length / @allSlides.length) * 100

    @handleMe = ->
      if !@touchDevice
        @processSlide(true)
    @handleNotMe = ->
      if !@touchDevice
        @processSlide(false)

    @handleRefresh = ->
      @refreshVisible = ""
      @loadingVisible = "tf-visible"
      @imageTries[@index + 1] = 0
      @loadImage(@index + 1)

    @panelOne.class = "current"
    @panelTwo.class = "next"

    @animateSlide = ->
      @progressBar = (@slideData.length / @allSlides.length) * 100
      @panelTwo.class = "current"

    @setSlide = ->
      if @panelTwo && @panelTwo.picture
        @panelOne.picture = @panelTwo.picture
        @panelOne.caption = @panelTwo.caption
        @panelOne.x = @panelTwo.x
        @panelOne.y = @panelTwo.y
        @update()
      else
        slideOne = @slides[@index]
        @panelOne.caption = slideOne.caption
        @panelOne.picture = slideOne[that.imageName]
        @panelOne.x = slideOne.focus_x
        @panelOne.y = slideOne.focus_y
        @update()
      @panelTwo.class = "next"
      @panelOne.class = "current"

      if @slides[@index + 1]
        slideTwo = @slides[@index + 1]
        @panelTwo.caption = slideTwo.caption
        @panelTwo.picture = slideTwo[that.imageName]
        @panelTwo.y = slideTwo.focus_y
        @panelTwo.x = slideTwo.focus_x
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

    opts.on("slideDeck.initialized", ->
      el = document.getElementsByClassName("tf-panel-two")[0]
      if el
        that.transitionEvent && el.addEventListener(that.transitionEvent, ->
          that.onFinishedTransition()
        )
        that.touch(document.querySelector(".tf-me"), ->
          that.processSlide(true)
        )
        that.touch(document.querySelector(".tf-not-me"), ->
          that.processSlide(false)
        )

      that.customSlides ?= Array()
      for slide in that.customSlides
        that.slides.splice(slide.position, slide)
      that.update()
    )
    @on("mount", ->
      that.mounted = true
      if that.initialized == true
        opts.trigger("slideDeck.initialized")
    )
    @initialize = ->
      @index = 0
      @visible = true
      @update()

      @slideData = DB.get("#{that.assessmentId}slideData")
      unless @slideData
        @slideData = Object()

      # Clone Slide array
      @allSlides = @slides.map((slide)->
        return slide
      )

      playedSlideIds = Object.keys(@slideData).map((slideName)->
        that.slideData[slideName].id
      )

      @slides = @slides.filter((slide)->
        playedSlideIds.indexOf(slide.id) == -1
      )

      @setSlide()
      @setProgressBar()
      images = @slides.map((slide)->
        slide[that.imageName]
      )

      @imageTries = Object()
      @images = Object()
      @loadImage = (i)->
        if images[i]
          that.imageTries[i] ?= 0
          that.images[i] = new Image()
          that.images[i].src = images[i]
          that.images[i].onerror = ->
            that.imageTries[i]++
            if that.imageTries[i] < 30
              setTimeout(->
                that.loadImage(i)
              , 1000)
            else
              that.refreshVisible = "tf-visible"
              that.hiddenRefresh = "tf-invisible"
              that.update()

          that.images[i].onload = ->
            if that.loadingVisible != ""
              that.loadingVisible = ""
              that.update()
            setTimeout(->
              that.loadImage(i + 1)
            , 300)


      @loadImage(0)
      that.initialized = true
      if that.mounted == true
        opts.trigger("slideDeck.initialized")


    @maxHeight = window.innerHeight
    document.addEventListener("orientationchange", ->
      that.maxHeight = window.innerHeight
      that.update()
    )
    @setCustomSlides = (slides)->
      @customSlides = slides
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
