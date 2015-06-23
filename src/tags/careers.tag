<tf-careers>
  <div class="tf-careers-container" if={this.visible}>
    <div class="tf-experience-filters">
      <div class="tf-filter-header">
        Experience Level:
      </div>
      <div class="tf-experience-filter {this.levels.indexOf('all') != -1 ? 'tf-highlight-filter' : ''}" onclick={this.setAll}>
        All
      </div><div class="tf-experience-filter  {this.parent.levels.indexOf(level) != -1 ? 'tf-highlight-filter' : ''} " onclick={this.parent.toggleLevel} each={level in this.levelSets}>{level + 1}</div>

    </div>
    <div class="tf-column-{index + 1} tf-column tf-columns-{this.parent.columns}" each="{careerSet, index in this.careerSet}">
      <div class="tf-career-details tf-show-details" each={careerSet.careers} onclick={this.parent.parent.careerClick}>
        <img src="{this.career.picture}" class="tf-image" />
        <div class="tf-title">{this.career.title}</div>
        <div class="tf-description tf-fade">{this.career.description}</div>
        <div class="tf-experience">Experience Level</div>

        <div class="tf-experience-boxes">
          <div class="tf-experience-box { this.exp > 0 ? 'tf-highlighted-box' : ''}"></div>
          <div class="tf-experience-box { this.exp > 1 ? 'tf-highlighted-box' : ''}"></div>
          <div class="tf-experience-box { this.exp > 2 ? 'tf-highlighted-box' : ''}"></div>
          <div class="tf-experience-box { this.exp > 3 ? 'tf-highlighted-box' : ''}"></div>
          <div class="tf-experience-box { this.exp > 4 ? 'tf-highlighted-box' : ''}"></div>
        </div>
        <span class="tf-education">Education </span>
        <div class="tf-education-text">{this.career.experience_level.degree}</div>

        <div class="tf-match-rate">Match Rate <div class="tf-percent">{Math.round(this.score)}%</div></div>
        <div class="tf-score">
          <div class="tf-clearfix"></div>
          <div class="tf-score-bar">
            <div class="tf-score-bar-inner" style="width: {Math.round(this.score)}%" data-match-rate="{Math.round(this.score)}"><div>
          </div>
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
    .tf-careers-container{
      font-family: "Source Sans Pro", Arial, Verdana, sans-serif;
      font-size: 24px;
			color: #4e4e4e;
      line-height: 1.5;
      margin: 20px;
      text-align: center;
      max-width: 900px;
      margin: 0px auto;
    }
    .tf-experience-filters{
      text-align: right;
      font-weight: 600;
      font-size: 15px;
      line-height: 18px;
      border-radius: 3px;
			margin-right: 10px;
      overflow: hidden;
    }
    .tf-experience-filters div{
      display: inline-block;
    }
    .tf-filter-header{
      margin-right: 10px;
    }
    @media screen (max-width: 380px) {
      .tf-filter-header {
        width: 100%;
				margin-bottom: 5px;
      }
		}
    .tf-experience-filter{
      padding: 5px 12px;
      background-color: #00aeef;
      cursor: pointer;
      color: #fff;
    }
    .tf-highlight-filter{
      background-color: #0390cb;
      -moz-box-shadow:    inset 1px 1px 5px #184f71;
      -webkit-box-shadow: inset 1px 1px 5px #184f71;
      box-shadow:         inset 1px 1px 5px #184f71;
    }
    .tf-careers div, .tf-careers img{
      box-sizing: content-box;
    }
    .tf-careers .tf-column{
      box-sizing: border-box;
      padding: 0 10px;
      display: inline-block;
      vertical-align: top;
    }
    .tf-careers .tf-columns-1{ width: 100%; }
    .tf-careers .tf-columns-2{ width: 50%; }
    .tf-careers .tf-columns-3{ width: 33%; }
    .tf-careers .tf-columns-4{ width: 25%; }
    .tf-careers .tf-columns-5{ width: 20%; }
    .tf-careers .tf-columns-6{ width: 16%; }
    .tf-careers .tf-columns-7{ width: 14%; }
    .tf-careers .tf-columns-8{ width: 12.5%; }
    .tf-careers .tf-columns-9{ width: 11%; }
    .tf-careers .tf-columns-10{ width: 10%; }
    .tf-careers .tf-columns-11{ width: 9%; }
    .tf-careers .tf-columns-12{ width: 8%; }
    @media screen and (min-width: 300px) and (max-width: 380px) {
      .tf-careers .tf-column{
        width: 100%;
      }
		}
    @media screen and (min-width: 381px) and (max-width: 800px) {
      .tf-careers .tf-column{
        width: 50%;
      }
    }
    @media screen and (min-width: 801px) and (max-width: 900px) {
      .tf-careers .tf-column{
        width: 25%;
      }
    }
    .tf-career-details {
      border: 1px solid;
      border-color: #e2e2e2;
      display: inline-block;
      width: 100%;
      margin: 10px 0;
      vertical-align: top;
      background-color: #fff;
      position: relative;
      line-height: 1.3;
      font-size: 13px;
      text-align: left;
    }
    .tf-career-details  hr{
      border: none;
      border-top: 2px solid;
      border-color: #e2e2e2;
      margin: 10px 0 5px 0;
    }
    .tf-career-details  .tf-image{
      width: 100%;
      top: 10px;
      margin: 0px auto;
    }
    .tf-career-details  .tf-title{
      margin: 10px;
      margin-bottom: 0px;
      font-weight: 600;
			font-size: 16px;
			height: 42px; /* font-size * line-height * lines to show */
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			display: block; /* Fallback for non-webkit */
			display: -webkit-box;
    }
    .tf-career-details  .tf-description{
      margin-top: 5px;
      font-weight: 400;
    }
    .tf-career-details  .tf-description,
    .tf-career-details  .tf-experience-boxes{
      padding: 0px 10px 10px;
    }
    .tf-career-details  .tf-experience,
    .tf-career-details  .tf-education,
    .tf-career-details  .tf-match-rate{
      display: block;
      color: #2e2e2e;
      font-weight: 600;
      font-size: 15px;
      margin: 10px;
      margin-bottom: 0px;
    }
    .tf-career-details  .tf-score{
      margin: 3px 10px 13px;
    }
    .tf-career-details  .tf-match-rate .tf-percent{
      display: inline-block;
      float: right;
      text-align:right;
			font-weight: 400;
			font-size: 14px;
    }

    .tf-career-details  .tf-experience-boxes {
			margin-top: 5px;
			padding-bottom: 0;
		}
    .tf-career-details  .tf-experience-box{
      background-color: #e2e2e2;
      width: 15px;
      height: 15px;
      margin-right: 2px;
      display: inline-block;
    }
    .tf-career-details  .tf-experience-box.tf-highlighted-box{
      background-color: #00aeef;
    }
    .tf-career-details  .tf-education-text{
      margin: 2px 10px 5px;
      color: #4e4e4e;
      font-weight: 300;
    }
    .tf-career-details  .tf-fade{
      position: relative;
      height: 55px;
      overflow: hidden;
    }
    .tf-career-details  .tf-fade:after {
      content: "";
      text-align: right;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 60%;
      height: 16px;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 70%);
    }
    .tf-score-bar{
      background-color: #e3e3e3;
      height:15px;
      display: block;
    }
    .tf-score-bar-inner{
      background-color: #00aeef;
      height: 100%;
    }
    .tf-score-bar-inner[data-match-rate='100'],
		.tf-score-bar-inner[data-match-rate^='9'] {
      background-color: #4bc275;
    }
    .tf-score-bar-inner[data-match-rate^='8'] {
      background-color: #6fd172;
    }
    .tf-score-bar-inner[data-match-rate^='7'] {
      background-color: #99d16f;
    }
    .tf-score-bar-inner[data-match-rate^='6'] {
      background-color: #bbd16f;
    }
    .tf-score-bar-inner[data-match-rate^='5'] {
      background-color: #ced16f;
    }
    .tf-score-bar-inner[data-match-rate^='4'] {
      background-color: #ece129;
    }
    .tf-score-bar-inner[data-match-rate^='3'] {
      background-color: #ecb329;
    }
    .tf-score-bar-inner[data-match-rate^='2'] {
      background-color: #f28316;
    }
    .tf-score-bar-inner[data-match-rate^='1'] {
      background-color: #f25416;
    }
    .tf-career-details.tf-show-details:hover {
      cursor: pointer;
    }
    .tf-clearfix{
      clear:both;
    }
  </style>
  <script>
    @assessmentId = @root.getAttribute("assessment-id")
    that = @
    this.levelSets = [0, 1, 2, 3, 4]
    this.levels = ["all"]

    @detailsTarget = if opts.detailsTarget then opts.details.target else ".tf-career"

    @careerClick = ->
      career = this
      career = {career: career.career, score: career.score}

      for careerWidget in that.careerWidgets
        careerWidget.setCareer(career)
    @mountDetails = ->
      career = @careers[0]
      this.careerWidgets = riot.mount(that.detailsTarget, "tf-career", {career: career})

    this.setAll = ->
      this.levels = ["all"]
      this.refreshColumns()
    this.toggleLevel = (level)->
      level = this.level
      if that.levels.indexOf("all") != -1
        that.levels = []
      if that.levels.indexOf(level) != -1
        that.levels = that.levels.filter((lvl)->
          lvl != level
        )
        if that.levels.length == 0
          that.levels = ["all"]
      else
        that.levels.push(level)

      that.refreshColumns()
    @refreshColumns = ->
      if @levels.indexOf("all") != -1
        @careers = @career_matches
        @setColumns()
      else
        levels = that.levels.map((a)-> a + 1 )
        window.Traitify.getCareers(@assessmentId, experience_levels: levels.join(","), number_of_matches: 20).then((careers)->
          that.careers = careers
          that.setColumns()
        )

    @setColumns = ->
      careerSet = Array()
      columns = @columns

      careers = @careers

      i = 0
      while i < columns
        careerSet[i] = {careers: Array()}
        i++

      j = 0
      while j < careers.length
        career = careers[j]

        career.exp = career.career.experience_level.id
        careerSet[j % columns].careers.push(career)
        j++
      @careerSet = careerSet
      @update()

    @initialize = ->
      if @career_matches
        @assessmentId = @assessmentId
        @careers = @career_matches
      @visible = true
      @columns = opts.columns || 4
      @setColumns()
      @mountDetails()

    if @assessmentId
      window.Traitify.getCareers(@assessmentId).then((response)->
        that.careers = response.careers

        that.initialize()
      )
  </script>
</tf-careers>
