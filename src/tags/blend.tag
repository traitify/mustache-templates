<tf-blend>
  <div class="tf-badges">
    <div class="tf-badge"  style="border-color: {this.type1.border}; background-color: rgba({this.type1.bg.r},{this.type1.bg.g},{this.type1.bg.b}, .3)">
      <img src="{this.type1.badge.image_medium}" />
    </div>
    <div class="tf-badge"  style="border-color: {this.type2.border};background-color: rgba({this.type2.bg.r},{this.type2.bg.g},{this.type2.bg.b}, .3)">
      <img src="{this.type2.badge.image_medium}" />
    </div>
  </div>

  <h2>{this.type1.name} / {this.type2.name}</h2>
  <div class="description">{this.description}</div>
</div>
<style>
  @font-face {
    font-family: "Source Sans Pro";
    font-style: normal;
    font-weight: 400;
    src: local('Source Sans Pro'), local('Source Sans Pro'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format('woff');
  }
  tf-blend{
    width: 100%;
  }
  tf-blend{
    font-family: "Source Sans Pro";
    padding: 10px;
  }
  tf-blend.ie{
    font-family: "Helvetica Neue", Helvetica, Arial, "sans-serif";
  }

  tf-blend div, img{
      box-sizing: content-box;
      width: 100%;
  }
  tf-blend  .tf-badge{
    width: 22%;
    padding:12%;
    position: relative;
    border-radius: 50%;
    border: 3px solid;
    display: inline-block;
  }
  tf-blend .tf-badge:first-child{
    margin-right: -4%;
  }
  tf-blend .tf-badge:last-child{
    margin-left: -4%;
  }
  tf-blend .tf-badges{
    width: 100%;
    max-width: 330px;
    margin: 0px auto;
    text-align:center;
  }
  tf-blend h2{
    text-align: center;
    font-size: 25px;
    font-weight: 400;
  }
  .description{
    max-width: 800px;
    margin: 0px auto;
    text-align: justify;
  }
</style>
<script>
  @assessmentId = @root.getAttribute("assessment-id")
  that = @
  if @assessmentId
    window.Traitify.getPersonalityTypes(@assessmentId).then((results)->
      that.type1 = results.personality_blend.personality_type_1
      that.type2 = results.personality_blend.personality_type_2
      hexToRgb = (hex)->
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return if result then {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } else null



      bgColor1 = that.type1.badge.color_1
      that.type1.bg = hexToRgb(bgColor1)
      that.type1.border = that.type1.badge.color_1

      bgColor2 = that.type2.badge.color_1
      that.type2.bg = hexToRgb(bgColor2)
      that.type2.border = that.type2.badge.color_1

      that.description = results.personality_blend.description
      that.update()
    )
</script>
</tf-blend>
