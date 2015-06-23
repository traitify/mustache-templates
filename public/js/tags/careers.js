riot.tag('tf-careers', '<div class="tf-careers-container" if="{this.visible}"> <div class="tf-experience-filters"> <div class="tf-filter-header"> Experience Level: </div> <div class="tf-experience-filter {this.levels.indexOf(\'all\') != -1 ? \'tf-highlight-filter\' : \'\'}" onclick="{this.setAll}"> All </div><div class="tf-experience-filter {this.parent.levels.indexOf(level) != -1 ? \'tf-highlight-filter\' : \'\'} " onclick="{this.parent.toggleLevel}" each="{level in this.levelSets}">{level + 1}</div> </div> <div class="tf-column-{index + 1} tf-column tf-columns-{this.parent.columns}" each="{careerSet, index in this.careerSet}"> <div class="tf-career-details tf-show-details" each="{careerSet.careers}" onclick="{this.parent.parent.careerClick}"> <img riot-src="{this.career.picture}" class="tf-image"> <div class="tf-title">{this.career.title}</div> <div class="tf-description tf-fade">{this.career.description}</div> <div class="tf-experience">Experience Level</div> <div class="tf-experience-boxes"> <div class="tf-experience-box { this.exp > 0 ? \'tf-highlighted-box\' : \'\'}"></div> <div class="tf-experience-box { this.exp > 1 ? \'tf-highlighted-box\' : \'\'}"></div> <div class="tf-experience-box { this.exp > 2 ? \'tf-highlighted-box\' : \'\'}"></div> <div class="tf-experience-box { this.exp > 3 ? \'tf-highlighted-box\' : \'\'}"></div> <div class="tf-experience-box { this.exp > 4 ? \'tf-highlighted-box\' : \'\'}"></div> </div> <span class="tf-education">Education </span> <div class="tf-education-text">{this.career.experience_level.degree}</div> <div class="tf-match-rate">Match Rate <div class="tf-percent">{Math.round(this.score)}%</div></div> <div class="tf-score"> <div class="tf-clearfix"></div> <div class="tf-score-bar"> <div class="tf-score-bar-inner" riot-style="width: {Math.round(this.score)}%"><div> </div> </div> </div> </div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-careers-container{ font-family: "Source Sans Pro"; font-size: 24px; line-height: 1.5; margin: 20px; text-align: center; max-width: 900px; margin: 0px auto; } .tf-careers.ie{ font-family: arial; } .tf-score-bar{ margin-top: 3px; background-color: #e3e3e3; height:10px; display: block; } .tf-score-bar-inner{ background-color: #00aeef; height: 100%; } .tf-careers div, .tf-careers img{ box-sizing: content-box; } .tf-careers .tf-experience-filters{ text-align: right; border-radius: 3px; overflow: hidden; } .tf-careers .tf-experience-filters div{ display: inline-block; font-weight: 600; font-size: 14px; line-height: 18px; } .tf-careers .tf-experience-filters .tf-filter-header{ margin-right: 10px; } .tf-careers .tf-experience-filters .tf-experience-filter{ padding: 5px 12px; background-color: #00aeef; cursor: pointer; color: #fff; } .tf-careers .tf-experience-filters .tf-highlight-filter{ background-color: #0390cb; -moz-box-shadow: inset 1px 1px 5px #184f71; -webkit-box-shadow: inset 1px 1px 5px #184f71; box-shadow: inset 1px 1px 5px #184f71; } .tf-careers .tf-column{ box-sizing: border-box; padding: 0 5px; display: inline-block; vertical-align: top; } .tf-careers .tf-columns-1{ width: 100%; } .tf-careers .tf-columns-2{ width: 50%; } .tf-careers .tf-columns-3{ width: 33%; } .tf-careers .tf-columns-4{ width: 25%; } .tf-careers .tf-columns-5{ width: 20%; } .tf-careers .tf-columns-6{ width: 16%; } .tf-careers .tf-columns-7{ width: 14%; } .tf-careers .tf-columns-8{ width: 12.5%; } .tf-careers .tf-columns-9{ width: 11%; } .tf-careers .tf-columns-10{ width: 10%; } .tf-careers .tf-columns-11{ width: 9%; } .tf-careers .tf-columns-12{ width: 8%; } .tf-careers .tf-career-details { border: 1px solid; border-color: #e2e2e2; display: inline-block; width: 100%; margin: 5px 0; vertical-align: top; background-color: #fff; position: relative; line-height: 1.2em; font-size: 14px; text-align: left; } .tf-careers .tf-career-details hr{ border: none; border-top: 2px solid; border-color: #e2e2e2; margin: 10px 0 5px 0; } @media (max-width: 768px) { .tf-careers .tf-column{ width: 50%; } .tf-careers .tf-columns-1{ width: 100%; } } .tf-careers .tf-career-details .tf-image{ width: 100%; top: 10px; margin: 0px auto; } .tf-careers .tf-career-details .tf-title{ margin: 10px; margin-bottom: 0px; font-weight: 600; } .tf-careers .tf-career-details .tf-description{ margin-top: 5px; font-weight: 400; } .tf-careers .tf-career-details .tf-description, .tf-careers .tf-career-details .tf-experience-boxes{ padding: 0px 10px 5px; } .tf-careers .tf-career-details .tf-experience, .tf-careers .tf-career-details .tf-education, .tf-careers .tf-career-details .tf-match-rate{ display: block; color: #2e2e2e; font-weight: 400; font-size: 16px; margin: 10px; margin-bottom: 0px; } .tf-careers .tf-career-details .tf-score{ margin: 10px; } .tf-careers .tf-career-details .tf-match-rate .tf-percent{ display: inline-block; float: right; text-align:right; } .tf-careers .tf-career-details .tf-experience-box{ background-color: #e2e2e2; width: 10px; height: 10px; margin-right: 2px; display: inline-block; } .tf-careers .tf-career-details .tf-experience-box.tf-highlighted-box{ background-color: #00aeef; } .tf-careers .tf-career-details .tf-education-text{ margin: 5px 10px; font-size: 14px; color: #4e4e4e; font-weight: 300; } .tf-careers .tf-career-details .tf-fade{ position: relative; height: 4.3em; overflow: hidden; } .tf-careers .tf-career-details .tf-fade:after { content: ""; text-align: right; position: absolute; bottom: 0; right: 0; width: 70%; height: 1.2em; background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 70%); } .tf-careers .tf-career-details.tf-show-details:hover { cursor: pointer; } .tf-clearfix{ clear:both; }', function(opts) {var that;

this.assessmentId = this.root.getAttribute("assessment-id");

that = this;

this.levelSets = [0, 1, 2, 3, 4];

this.levels = ["all"];

this.detailsTarget = opts.detailsTarget ? opts.details.target : ".tf-career";

this.careerClick = function() {
  var career, careerWidget, k, len, ref, results;
  career = this;
  career = {
    career: career.career,
    score: career.score
  };
  ref = that.careerWidgets;
  results = [];
  for (k = 0, len = ref.length; k < len; k++) {
    careerWidget = ref[k];
    results.push(careerWidget.setCareer(career));
  }
  return results;
};

this.mountDetails = function() {
  var career;
  career = this.careers[0];
  return this.careerWidgets = riot.mount(that.detailsTarget, "tf-career", {
    career: career
  });
};

this.setAll = function() {
  this.levels = ["all"];
  return this.refreshColumns();
};

this.toggleLevel = function(level) {
  level = this.level;
  if (that.levels.indexOf("all") !== -1) {
    that.levels = [];
  }
  if (that.levels.indexOf(level) !== -1) {
    that.levels = that.levels.filter(function(lvl) {
      return lvl !== level;
    });
    if (that.levels.length === 0) {
      that.levels = ["all"];
    }
  } else {
    that.levels.push(level);
  }
  return that.refreshColumns();
};

this.refreshColumns = function() {
  var levels;
  if (this.levels.indexOf("all") !== -1) {
    this.careers = this.career_matches;
    return this.setColumns();
  } else {
    levels = that.levels.map(function(a) {
      return a + 1;
    });
    return window.Traitify.getCareers(this.assessmentId, {
      experience_levels: levels.join(","),
      number_of_matches: 20
    }).then(function(careers) {
      that.careers = careers;
      return that.setColumns();
    });
  }
};

this.setColumns = function() {
  var career, careerSet, careers, columns, i, j;
  careerSet = Array();
  columns = this.columns;
  careers = this.careers;
  i = 0;
  while (i < columns) {
    careerSet[i] = {
      careers: Array()
    };
    i++;
  }
  j = 0;
  while (j < careers.length) {
    career = careers[j];
    career.exp = career.career.experience_level.id;
    careerSet[j % columns].careers.push(career);
    j++;
  }
  this.careerSet = careerSet;
  return this.update();
};

this.initialize = function() {
  if (this.career_matches) {
    this.assessmentId = this.assessmentId;
    this.careers = this.career_matches;
  }
  this.visible = true;
  this.columns = opts.columns || 4;
  this.setColumns();
  return this.mountDetails();
};

if (this.assessmentId) {
  window.Traitify.getCareers(this.assessmentId).then(function(response) {
    that.careers = response.careers;
    return that.initialize();
  });
}

});
