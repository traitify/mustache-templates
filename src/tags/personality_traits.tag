<tf-personality-traits>
  <div class="tf-personality-traits-container" if={this.visible}>
    <div each={trait in this.traits} class="tf-trait" style="border-color:#{trait.badge.color_1}">
      <div class="tf-background-color" style="background-color: #{trait.badge.color_1}"></div>
      <div class="tf-name">{trait.name}</div>
      <div class="tf-definition">{trait.definition}</div>
      <div class="tf-background" style="background-image:url({trait.badge.image_medium})"></div>
    </div>
  </div>
  <style>
    .tf-personality-traits-container .tf-background-color{
      opacity: .03;
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
    }
    .tf-personality-traits-container div, .tf-personality-traits-container img{
      box-sizing: content-box;
    }
    .tf-personality-traits-container .your-top-traits{
      font-size: 24px;
      margin: 20px;
      text-align: center;
    }
    .tf-personality-traits-container{
      max-width:800px;
      margin:0px auto;
      text-align: center;
      font-family: "Source Sans Pro";
    }
    .tf-personality-traits-container .tf-trait{
      border-top: 6px solid;
      border-color: #99aaff;
      display: inline-block;
      width: 180px;
      margin: 5px;
      vertical-align:top;
      background-color:#fff;
      height: 180px;
      position:relative;
      line-height: 1.2em;
      text-align:center;
    }
    .tf-personality-traits-container.ie .tf-trait{
      height:280px;
    }
    @media (max-width: 768px) {
      tf-traits .personality-traits .tf-trait{
        width:45%;
      }
    }
    .tf-personality-traits-container .tf-trait .tf-name{
      margin: 20px 20px;
      margin-bottom: 0px;
      display: inline-block;
      font-weight: 600;
      text-align: center;
    }
    .tf-personality-traits-container .tf-trait .tf-definition{
      padding: 0px 20px;
      margin-top: 10px;
      font-size:14px;
      font-weight: 400;
      text-align: left;
    }
    .tf-personality-traits-container .tf-trait .tf-background{
      width: 52px;
      height: 52px;
      right: 20px;
      bottom: 20px;
      position:absolute;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      opacity: .15;
      -webkit-transition: all .2s ease-in-out;
      -moz-transition: all .2s ease-in-out;
      -o-transition: all .2s ease-in-out;
      transition: all .2s ease-in-out;
    }
    .tf-personality-traits-container .tf-trait:hover .tf-background{
      opacity:.8;
    }
  </style>
<script>
  @assessmentId =  opts.assessmentId || @root.getAttribute("assessment-id")

  that = @
  @initialize = ->
    that.traits = @personality_traits if @personality_traits
    that.visible = true

    that.traits = that.traits.slice(0, 8).map((trait)->
      tf = trait.personality_trait
      tf.badge = tf.personality_type.badge
      tf
    )
    that.update()
  if @personality_traits
    that.initialize()
  else if @assessmentId
    window.Traitify.getPersonalityTraits(@assessmentId).then((results)->
      that.traits = results.personality_traits
      that.initialize()
    )
</script>
</tf-personality-traits>
