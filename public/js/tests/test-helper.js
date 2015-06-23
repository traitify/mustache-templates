var Mocks, testSetup;

testSetup = function() {
  return "<div class='tf-slide-deck'></div>\n<div class='tf-careers'></div>\n<div class='tf-career'></div>\n<div class='tf-personality-traits'></div>\n<div class='tf-personality-types'></div>\n<div class='tf-famous-people'></div>\n<div class='tf-personality-blend'></div>\n";
};

Mocks = Object();

Mocks.slideDeck = {
  unfinished: function(after) {
    if (after == null) {
      after = function() {};
    }
    Traitify.get = function() {
      return {
        then: function(callback) {
          callback({
            completed_at: void 0,
            slides: [
              {
                id: "oaunth",
                caption: "hi",
                image_desktop_retina: "/fixtures/slide_one.jpg"
              }, {
                id: "aoeu",
                caption: "how",
                image_desktop_retina: "/fixtures/slide_two.jpg"
              }, {
                id: "aoeuaoueaoeu",
                caption: "hidy",
                image_desktop_retina: "/fixtures/slide_one.jpg"
              }
            ]
          });
          return after();
        }
      };
    };
    return Traitify.put = function() {
      return "";
    };
  },
  finished: function(after) {
    if (after == null) {
      after = function() {};
    }
    return Traitify.get = function() {
      return {
        then: function(callback) {
          callback({
            completed_at: new Date(),
            slides: [
              {
                caption: "hi",
                image_desktop_retina: "/fixtures/slide_one.jpg",
                completed_at: (new Date()).toString()
              }, {
                caption: "how",
                image_desktop_retina: "/fixtures/slide_two.jpg",
                completed_at: (new Date()).toString()
              }, {
                caption: "hidy",
                image_desktop_retina: "/fixtures/slide_one.jpg"
              }
            ]
          });
          return after();
        }
      };
    };
  },
  addSlides: function(after) {
    if (after == null) {
      after = function() {};
    }
    return Traitify.addSlides = function() {
      return {
        then: function(callback) {
          callback({
            slides: void 0,
            personality_types: {
              hi: ""
            }
          });
          return after();
        }
      };
    };
  }
};

Mocks.results = {
  all: function() {
    return Traitify.get = function() {
      return {
        then: function(callback) {
          return callback({
            completed_at: new Date(),
            slides: [],
            personality_traits: [],
            personality_types: [
              {
                personality_type: {
                  name: "here",
                  badge: {
                    color_1: "#aaa"
                  },
                  famous_people: [{}]
                },
                score: 10
              }, {
                personality_type: {
                  name: "here",
                  badge: {
                    color_1: "#aaa"
                  },
                  famous_people: [{}]
                },
                score: 10
              }
            ],
            personality_blend: {
              personality_type_1: {
                badge: {
                  color_1: "#aaa"
                }
              },
              personality_type_2: {
                badge: {
                  color_1: "#aaa"
                }
              }
            },
            career_matches: [
              {
                career: {
                  name: "career",
                  experience_level: "a",
                  salary_projection: {
                    annual_salary_mean: "a",
                    annual_salary_median: "a"
                  }
                },
                score: 134
              }
            ]
          });
        }
      };
    };
  }
};
