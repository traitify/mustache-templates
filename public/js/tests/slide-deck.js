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
    var intervals, that;
    Mocks.slideDeck.finished();
    Mocks.slideDeck.addSlides();
    Mocks.results.all();
    that = widgets.slideDeck.mount;
    return intervals = setInterval(function() {
      if (Object.keys(that.slideData).length === that.allSlides.length) {
        clearInterval(intervals);
      }
      return $$(".tf-not-me").trigger("click");
    }, 500);
  });
  widgets.assessmentId = "assessment-id";
  return widgets.load();
});
