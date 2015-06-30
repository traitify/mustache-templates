<tf-famous-people>
  <div class="tf-famous-people-container" if={this.visible}>
    <div class="tf-famous-people-scroller">
      <div class="tf-famous-people-inner">
        <div class="tf-famous-person" each={famousPerson in this.famousPeople}>
          <div class="tf-image">
            <img src="{famousPerson.picture}" />
          </div>
          <div class="tf-name">{famousPerson.name}</div>
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
    .tf-famous-people-container{
      font-family: "Source Sans Pro", Arial, Verdana, sans-serif;
      margin: 0 auto 30px;
    }
    .tf-famous-people-inner{
      width: 860px;
      margin: 0 auto;
    }
    .tf-famous-people-scroller{
      height: 230px;
      max-width: 860px;
      margin: 0 auto;
      overflow-y: hidden;
      overflow-x: auto;
      text-align: center;
    }
    .tf-famous-person{
      display: inline-block;
      padding: 10px 15px;
      text-align: center;
      color: #555;
      margin: 0 auto;
      vertical-align: top;
    }
    .tf-famous-person .tf-image{
      width: 142px;
      height: 142px;
      border-radius: 50%;
      overflow: hidden;
    }
    .tf-name{
      margin-top: 20px;
      width: 142px;
      line-height:1em;
    }
  </style>
  <script>
    @assessmentId = @root.getAttribute("assessment-id")
    that = @
    @initialize = ->
      that.visible = true

      famousPeople = Array()
      for personalityType in that.personality_types
        for famousPerson in personalityType.personality_type.famous_people
          famousPeople.push(famousPerson)
      that.famousPeople = famousPeople[0..4].sort(-> 0.5 - Math.random())
      that.update()
    if opts.personality_types
      @personality_types = opts.personality_types
      @personality_blend = opts.personality_blend

      @initialize()
    else if @assessmentId
      window.Traitify.getPersonalityTypes(@assessmentId).then((response)->
        that.famousPeople = response.personality_blend.famous_people

        that.initialize()
      )
  </script>
</tf-famous-people>
