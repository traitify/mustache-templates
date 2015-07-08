QUnit.module( "Slide Deck", {
  beforeEach: ->
    for keyName in Object.keys(window.sessionStorage)
      window.sessionStorage.removeItem(keyName)
    $$.removeCookie("tfassessment-idslideData")
})
QUnit.test( "Initialized", ( assert )->
  Mocks.slideDeck.unfinished()
  done = assert.async()

  $$("#test-container").html(testSetup())
  widgets = window.Traitify.ui.init()

  widgets.on("slideDeck.initialized", ->
    assert.ok( document.querySelector(".tf-caption").innerHTML == "hi", "Passed!" )
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
    assert.ok( document.querySelector(".tf-caption").innerHTML == "hi", "Passed!" )
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
    assert.ok( document.querySelector(".tf-caption").innerHTML == "hi", "Passed!" )
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
    checkReady = ->
      if Object.keys(widgetData).length == 4
        assert.ok(true, "Passed!")
        done()
    that = widgets.slideDeck.mount
    widgetData = Object()

    widgets.on("famousPeople.initialized", ->
      widgetData.famousPeople = true
      checkReady()
    )
    widgets.on("personalityBlend.initialized", ->
      widgetData.personalityBlend = true
      checkReady()
    )
    widgets.on("personalityTraits.initialized", ->
      widgetData.personalityTraits = true
      checkReady()
    )
    widgets.on("personalityTypes.initialized", ->
      widgetData.personalityTypes = true
      checkReady()
    )

    intervals = setInterval(->
      if Object.keys(that.slideData).length == that.allSlides.length
        clearInterval(intervals)
      $$(".tf-not-me").trigger("click")
    , 500)
  )

  widgets.assessmentId = "assessment-id"
  widgets.load()
)
