QUnit.module("Slide Deck", {
  beforeEach: function() {
    return $$.removeCookie("tfassessment-idslideData");
  }
});

QUnit.test("Initialized", function(assert) {
  var done, widgets;
  Mocks.slideDeck.unfinished();
  done = assert.async();
  $$("#test-container").html(testSetup());
  widgets = window.Traitify.ui.init();
  widgets.on("slideDeck.initialized", function() {
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
  widgets.on("slideDeck.initialized", function() {
    $$(".tf-me").trigger("click");
    assert.ok(document.querySelector(".caption").innerHTML === "hi", "Passed!");
    return done();
  });
  widgets.assessmentId = "assessment-id";
  return widgets.load();
});

QUnit.test("Click Not Me", function(assert) {
  var done, widgets;
  Mocks.slideDeck.unfinished();
  done = assert.async();
  $$("#test-container").html(testSetup());
  widgets = window.Traitify.ui.init();
  widgets.on("slideDeck.initialized", function() {
    $$(".tf-not-me").trigger("click");
    assert.ok(document.querySelector(".caption").innerHTML === "hi", "Passed!");
    return done();
  });
  widgets.assessmentId = "assessment-id";
  return widgets.load();
});

QUnit.test("Click To End Of Slider", function(assert) {
  var done, widgets;
  Mocks.slideDeck.unfinished();
  done = assert.async();
  $$("#test-container").html(testSetup());
  widgets = window.Traitify.ui.init();
  widgets.on("slideDeck.initialized", function() {
    var checkReady, intervals, that, widgetData;
    Mocks.slideDeck.finished();
    Mocks.slideDeck.addSlides();
    Mocks.results.all();
    checkReady = function() {
      if (Object.keys(widgetData).length === 4) {
        assert.ok(true, "Passed!");
        return done();
      }
    };
    that = widgets.slideDeck.mount;
    widgetData = Object();
    widgets.on("famousPeople.initialized", function() {
      widgetData.famousPeople = true;
      return checkReady();
    });
    widgets.on("personalityBlend.initialized", function() {
      widgetData.personalityBlend = true;
      return checkReady();
    });
    widgets.on("personalityTraits.initialized", function() {
      widgetData.personalityTraits = true;
      return checkReady();
    });
    widgets.on("personalityTypes.initialized", function() {
      widgetData.personalityTypes = true;
      return checkReady();
    });
    return intervals = setInterval(function() {
      if (Object.keys(that.slideData).length === that.allSlides.length - 1) {
        clearInterval(intervals);
      }
      return $$(".tf-not-me").trigger("click");
    }, 500);
  });
  widgets.assessmentId = "assessment-id";
  return widgets.load();
});
