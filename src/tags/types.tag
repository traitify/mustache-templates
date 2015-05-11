<tf-types>
    <div class="tf-types-container">
      <div class="tf-types-scroller">
        <div class="tf-types">
          <div each={type in this.currentTypes} class="tf-type {type.active}" onclick={parent.handleClick}>
            <div class="tf-name-small">{type.name}</div>
            <div class="tf-badge-score-container">
              <img class="tf-badge" src="{type.badge.image_medium}">
              <div class="tf-badge-score" style="height: {type.score}%; background-color: #{type.badge.color_1}"></div>
              <div class="tf-badge-score-background" style="background-color: #{type.badge.color_1}"></div>
            </div>
            <div class="tf-percent">
              {type.score} / 100
            </div>
          </div>
          <div class="tf-pointer" style="left: {this.pointerPosition}px; background-color: #{this.pointerColor}"></div>
        </div>
      </div>
      <div class="tf-name">
        {this.name}
      </div>
      <div class="tf-description">
        {this.description}
      </div>
  </div>
  <style>
    @font-face {
      font-family: "Source Sans Pro";
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro'), local('Source Sans Pro'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format('woff');
    }
    .tf-types-scroller{
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      margin-bottom: 35px;
    }
    .tf-pointer{
      -webkit-transition: all .2s ease-in-out;
      -moz-transition: all .2s ease-in-out;
      -o-transition: all .2s ease-in-out;
      transition: all .2s ease-in-out;
      left: 0px;
      width: 80px;
      margin-left: 57px;
      height: 5px;
      background-color: #aaa;
      border-radius: 3px;
      position: absolute;
      bottom: 0px;
    }
    .tf-types-container{
      font-family: "Source Sans Pro";
    }
    .tf-types-container .tf-score{
      border-bottom: 1px solid #fff;
      font-size: 22px;
    }
    .tf-types-container .tf-name{
      font-size: 28px;
      margin-top: 15px;
    }
    .tf-types-container .tf-types .tf-name-small{
      font-size: 16px;
      margin-top: 0px;
    }
    .tf-types-container .tf-badge{
      width: 100%;
    }
    .tf-badge-score-background{
        width: 100%;
        position: relative;
        height: 100%;
        opacity: .1;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
    }
    .tf-types-container .tf-badge-score-container{
      width: 40px;
      height: 40px;
      position: relative;
      overflow: hidden;
      border-radius: 50%;
      padding: 22px;
      margin: 5px;
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0)
    }
    .tf-types-container .tf-type .tf-badge{
      opacity: .9;
    }
    .tf-types-container .tf-type:hover .tf-badge-score{
      -webkit-animation-name: ebbFlow;
      -webkit-animation-duration: 1s;
      -webkit-animation-iteration-count: 1;

      animation-name: ebbFlow;
      animation-duration: 1s;
      animation-iteration-count: 1;
      bottom: 0px
    }
    .tf-types-container .tf-percent{
      position: relative;
      color: #bbb;
    }
    .tf-types-container .tf-badge-score-background{
      width: 100%;
      height: 100%;
      opacity: .1;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)";
      position: absolute;
      left: 0px;
      bottom: 0px;
    }
    .tf-types-container .tf-badge-score{
      width: 100%;
      height: 0%;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
      position: absolute;
      left: 0px;
      bottom: 0px;
      -webkit-transition: all .4s ease-in-out;
      -moz-transition: all .4s ease-in-out;
      -o-transition: all .4s ease-in-out;
      transition: all .4s ease-in-out;
      opacity: .3;
    }
    .tf-types-container .tf-types{
      margin: 0px auto;
      position: relative;
      display: inline-block;
      min-width:1000px;
    }
    .tf-types-container .tf-type{
      text-align: center;
      cursor: pointer;
      display: inline-block;
      position: relative;
      display: inline-block;
      padding: 10px;
      margin: 0px 10px;
    }
    .tf-types-container .tf-description{
      max-width: 600px;
      margin: 0px auto;
      text-align: justify;
      height: 130px;
    }
    @keyframes ebbFlow {
      0% {
        bottom: 0px;
      }
      25% {
        bottom: -25px;
        -ms-transform: skewY(5deg);
        -webkit-transform: skewY(5deg);
        transform: skewY(5deg);
      }
      45% {
        padding-bottom: 10px;
        -ms-transform: skewY(-4deg);
        -webkit-transform: skewY(-4deg);
        transform: skewY(-4deg);
      }
      70% {
        bottom:-5px;
        -ms-transform: skewY(2deg);
        -webkit-transform: skewY(2deg);
        transform: skewY(2deg);
      }
      100%{
        bottom:0px;
        -ms-transform: skewY(0deg);
        -webkit-transform: skewY(0deg);
        transform: skewY(0deg);
      }
    }
    @-webkit-keyframes ebbFlow {
      0% {
        bottom: 0px;
      }
      25% {
        bottom: -25px;
        -ms-transform: skewY(5deg);
        -webkit-transform: skewY(5deg);
        transform: skewY(5deg);
      }
      45% {
        padding-bottom: 10px;
        -ms-transform: skewY(-4deg);
        -webkit-transform: skewY(-4deg);
        transform: skewY(-4deg);
      }
      70% {
        bottom:-5px;
        -ms-transform: skewY(2deg);
        -webkit-transform: skewY(2deg);
        transform: skewY(2deg);
      }
      100%{
        bottom:0px;
        -ms-transform: skewY(0deg);
        -webkit-transform: skewY(0deg);
        transform: skewY(0deg);
      }
    }
  </style>
  <script>
    @assessmentId = @root.getAttribute("assessment-id")
    that = @
    if @assessmentId

      window.Traitify.getPersonalityTypes(@assessmentId).then((results)->

        that.types = results.personality_types.map((i, index)->
          score = Math.round(i.score)
          i = i.personality_type
          i.score = score
          i.position = index

          return i
        )
        that.types[0].active = "tf-active"
        that.description = that.types[0].description
        that.name = that.types[0].name
        that.score = that.types[0].score
        that.pointerPosition = 0
        that.pointerColor = that.types[0].badge.color_1
        that.currentTypes = that.types
        that.handleClick = (e)->
          e.preventDefault()

          that.description = this.type.description
          that.types = that.types.map((type)->
            type.active = ""
            type
          )
          that.pointerPosition = this.type.position * 134
          that.pointerColor = this.type.badge.color_1
          that.score = this.type.score
          that.name = this.type.name
          this.type.active = "tf-active"
          that.update()
        that.update()
        console.log(that.handleClick)
      )
  </script>
</tf-types>
