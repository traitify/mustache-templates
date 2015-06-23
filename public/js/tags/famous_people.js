riot.tag('tf-famous-people', '<div class="tf-famous-people-container" if="{this.visible}"> <div class="tf-famous-people-scroller"> <div class="tf-famous-people-inner"> <div class="tf-famous-person" each="{famousPerson in this.famousPeople}"> <div class="tf-image"> <img riot-src="{famousPerson.picture}"> </div> <div class="tf-name">{famousPerson.name}</div> </div> </div> </div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-famous-people-container{ font-family: "Source Sans Pro" } .tf-famous-people-inner{ width: 860px; margin: 0px auto } .tf-famous-people-scroller{ height: 230px; max-width: 860px; margin: 0px auto; overflow-y: hidden; overflow-x: auto; text-align: center; } .tf-famous-person{ font-family: "Source Sans Pro"; display: inline-block; padding: 10px 15px; text-align: center; color: #555; margin: 0px auto; vertical-align: top; } .tf-famous-person .tf-image{ width: 142px; height: 142px; border-radius: 50%; overflow: hidden; } .tf-name{ margin-top: 20px; width: 142px; line-height:1em; }', function(opts) {var that;

this.assessmentId = this.root.getAttribute("assessment-id");

that = this;

this.initialize = function() {
  var famousPeople, famousPerson, i, j, len, len1, personalityType, ref, ref1;
  that.visible = true;
  famousPeople = Array();
  ref = that.personality_types;
  for (i = 0, len = ref.length; i < len; i++) {
    personalityType = ref[i];
    ref1 = personalityType.personality_type.famous_people;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      famousPerson = ref1[j];
      famousPeople.push(famousPerson);
    }
  }
  that.famousPeople = famousPeople.slice(0, 5).sort(function() {
    return 0.5 - Math.random();
  });
  return that.update();
};

if (opts.personality_types) {
  this.personality_types = opts.personality_types;
  this.personality_blend = opts.personality_blend;
  this.initialize();
} else if (this.assessmentId) {
  window.Traitify.getPersonalityTypes(this.assessmentId).then(function(response) {
    that.famousPeople = response.personality_blend.famous_people;
    return that.initialize();
  });
}

});
