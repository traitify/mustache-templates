<tf-personality-blend>
  <div class="tf-blends-container" if={this.visible}>
    <div class="tf-badges">
      <div class="tf-badge"  style="border-color: {this.type1.border};">
        <div class="tf-badge-background"></div>
        <img src="{this.type1.badge.image_medium}" />
      </div>
      <div class="tf-badge"  style="border-color: {this.type2.border};">
        <div class="tf-badge-background"></div>
        <img src="{this.type2.badge.image_medium}" />
      </div>
    </div>

    <h2 class="tf-blend-title">{this.type1.name} / {this.type2.name}</h2>
    <div class="tf-blend-description">{this.description}</div>
  </div>
<style>
  @font-face {
    font-family: "Source Sans Pro";
    font-style: normal;
    font-weight: 400;
    src: local('Source Sans Pro'), local('Source Sans Pro'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format('woff');
  }
  .tf-blends-container{
    width: 100%;
    font-family: "Source Sans Pro", Arial, Verdana, sans-serif;
    padding: 20px 20px 10px;
    box-sizing: border-box;
  }
  .tf-blends-container .tf-badge-background{
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: .2;
    top: 0;
    left: 0;
  }
  img{
    width: 100%;
  }
  .tf-blends-container .tf-badges{
    width: 100%;
    max-width: 330px;
    margin: 0 auto;
    text-align:center;
  }
  .tf-blends-container .tf-badge{
    width: 22%;
    padding:12%;
    position: relative;
    border-radius: 50%;
    border: 2px solid;
    display: inline-block;
    overflow: hidden;
  }
  .tf-blends-container .tf-badge:first-child{
    margin-right: -4%;
    z-index: 1;
  }
  .tf-blends-container .tf-badge:last-child{
    margin-left: -4%;
  }
  .tf-blend-title {
    text-align: center;
    font-size: 25px;
    font-weight: 400;
  }
  .tf-blend-description{
    margin: 0 auto 30px;
    text-align: justify;
    font-size: 15px;
  }
  @media screen and (min-width: 768px) {
    .tf-blend-description {
      font-size: 17px;
      max-width: 580px;
    }
  }
  @media screen and (min-width: 900px) {
    .tf-blend-description {
      font-size: 18px;
      line-height: 1.35;
      max-width: 650px;
    }
  }
</style>
<script>
  @assessmentId =  opts.assessmentId || @root.getAttribute("assessment-id")
  that = @
  @on("mount", ->
    @mounted = true
    if @initialized
      opts.trigger("personalityBlend.initialized")
  )
  @initialize = ->
    that.visible = true

    that.type1 = that.personality_blend.personality_type_1
    that.type2 = that.personality_blend.personality_type_2

    that.type1.bg = that.type1.badge.color_1
    that.type1.border = that.type1.badge.color_1

    that.type2.bg = that.type2.badge.color_1
    that.type2.border = that.type2.badge.color_1

    that.description = that.personality_blend.description
    that.update()
    that.initialized = true
    if that.mounted
      opts.trigger("personalityBlend.initialized")
</script>
</tf-personality-blend>
