<tf-traits>
  <div class="tf-personality-traits">
    <div each={trait in this.traits} class="tf-trait" style="border-color:#{trait.badge.color_1}">
      <div class="tf-name">{trait.name}</div>
      <div class="tf-definition">{trait.definition}</div>
      <div class="tf-background" style="background-image:url({trait.badge.image_medium})"></div>
    </div>
  </div>
  <style>
    tf-traits .tf-personality-traits{
      font-family: "Source Sans Pro";
    }
    tf-traits div, tf-traits img{
      box-sizing: content-box;
    } 
    tf-traits .your-top-traits{
      font-size: 24px;
      margin: 20px;
      text-align: center;
    }
    tf-traits .tf-personality-traits{
      max-width:800px;
      margin:0px auto;
      text-align: center;
    }
    tf-traits .tf-trait{
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
    tf-traits.ie .tf-trait{
      height:280px;
    }
    @media (max-width: 768px) {
      tf-traits .personality-traits .tf-trait{
        width:45%;
      }
    }
    tf-traits .tf-trait .tf-name{
      margin: 20px 20px;
      margin-bottom: 0px;
      display: inline-block;
      font-weight: 600;
      text-align: left;
    }
    tf-traits.ie .personality-traits .tf-trait .tf-name{
        display:block;
        text-align:center;
    }
    tf-traits .tf-trait .tf-definition{
      padding: 0px 20px;
      margin-top: 10px;
      font-size:14px;
      font-weight: 400;
      text-align: left;
    }
    tf-traits .tf-trait .tf-background{
      width: 80%;
      height: 80%;
      margin: 10%;
      top: 10px;
      position:absolute;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      opacity: .15
    }
    tf-traits.ie .tf-trait .tf-background{
      margin: 0px auto;
      width: 50px;
      height: 50px;
      position:relative;
    }
  </style>
<script>
  @assessmentId = @root.getAttribute("assessment-id")
  that = @
  window.Traitify.getPersonalityTraits(@assessmentId).then((results)->
    that.traits = results.slice(0, 8).map((trait)-> 
      tf = trait.personality_trait 
      tf.badge = tf.personality_type.badge
      tf
    )
    that.update()
  )
</script>
</tf-traits>
