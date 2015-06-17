var Mocks, testSetup;

testSetup = function() {
  return "<div class='tf-slide-deck'></div>\n<div class='tf-results'></div>";
};

Mocks = Object();

Mocks.slideDeck = {
  unfinished: function() {
    Traitify.get = function() {
      return {
        then: function(callback) {
          return callback({
            completed_at: void 0,
            slides: [
              {
                caption: "hi",
                image_desktop_retina: "/fixtures/slide_one.jpg"
              }, {
                caption: "how",
                image_desktop_retina: "/fixtures/slide_two.jpg"
              }, {
                caption: "hidy",
                image_desktop_retina: "/fixtures/slide_one.jpg"
              }
            ]
          });
        }
      };
    };
    return Traitify.put = function() {
      return "";
    };
  },
  finished: function() {
    return Traitify.get = function() {
      return {
        then: function(callback) {
          return callback({
            completed_at: void 0,
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
        }
      };
    };
  }
};

QUnit.test("Initialized Slide Deck", function(assert) {
  var done, widgets;
  Mocks.slideDeck.unfinished();
  done = assert.async();
  $$("#test-container").html(testSetup());
  widgets = window.Traitify.ui.init();
  widgets.slideDeck[0].on("initialized", function() {
    assert.ok(document.querySelector(".caption").innerHTML === "hi", "Passed!");
    return done();
  });
  widgets.assessmentId = "assessment-id";
  return widgets.load();
});

QUnit.test("Click Me", function(assert) {
  var done, widgets;
  Mocks.slideDeck.unfinished();
  done = assert.async();
  $$("#test-container").html(testSetup());
  widgets = window.Traitify.ui.init();
  widgets.slideDeck[0].on("initialized", function() {
    $$(".tf-me").trigger("click");
    assert.ok(document.querySelector(".caption").innerHTML === "hi", "Passed!");
    return done();
  });
  widgets.assessmentId = "assessment-id";
  return widgets.load();
});
