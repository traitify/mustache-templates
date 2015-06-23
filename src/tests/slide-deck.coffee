QUnit.module( "Slide Deck", {
  beforeEach: ->
    $$.removeCookie("tfassessment-idslideData")
})
QUnit.test( "Initialized", ( assert )->
  Mocks.slideDeck.unfinished()
  done = assert.async()

  $$("#test-container").html(testSetup())
  widgets = window.Traitify.ui.init()

  widgets.on("slideDeck.initialized", ->
    assert.ok( document.querySelector(".caption").innerHTML == "hi", "Passed!" )
    done()
  )
  widgets.assessmentId = "assessment-id"
  widgets.load()
)
QUnit.test( "Click Me", ( assert )->
  Mocks.slideDeck.unfinished()
  done = assert.async()

  $$("#test-container").html(testSetup())
  widgets = window.Traitify.ui.init()

  widgets.on("slideDeck.initialized", ->
    $$(".tf-me").trigger("click")
    assert.ok( document.querySelector(".caption").innerHTML == "hi", "Passed!" )
    done()
  )

  widgets.assessmentId = "assessment-id"
  widgets.load()
)
QUnit.test( "Click Not Me", ( assert )->
  Mocks.slideDeck.unfinished()
  done = assert.async()

  $$("#test-container").html(testSetup())
  widgets = window.Traitify.ui.init()

  widgets.on("slideDeck.initialized", ->
    $$(".tf-not-me").trigger("click")
    assert.ok( document.querySelector(".caption").innerHTML == "hi", "Passed!" )
    done()
  )

  widgets.assessmentId = "assessment-id"
  widgets.load()
)
QUnit.test( "Click To End Of Slider", ( assert )->

  Mocks.slideDeck.unfinished()
  done = assert.async()

  $$("#test-container").html(testSetup())
  widgets = window.Traitify.ui.init()
  widgets.on("slideDeck.initialized", ->
    Mocks.slideDeck.finished()
    Mocks.slideDeck.addSlides()
    Mocks.results.all()

    that = widgets.slideDeck.mount

    intervals = setInterval(->
      if Object.keys(that.slideData).length == that.allSlides.length
        clearInterval(intervals)
      $$(".tf-not-me").trigger("click")
    , 500)
  )

  widgets.assessmentId = "assessment-id"
  widgets.load()
)
