testSetup = ->
  """
    <div class='tf-slide-deck'></div>
    <div class='tf-results'></div>
  """
Mocks = Object()
Mocks.slideDeck = {
  unfinished: ->
    Traitify.get = ->
      {then: (callback)->
        callback({
          completed_at: undefined,
          slides: [
            {
              caption: "hi",
              image_desktop_retina: "/fixtures/slide_one.jpg",
            },
            {
              caption: "how",
              image_desktop_retina: "/fixtures/slide_two.jpg",
            },
            {
              caption: "hidy",
              image_desktop_retina: "/fixtures/slide_one.jpg",
            }
          ]
        })
      }
    Traitify.put = ->
      ""
  finished: ->
    Traitify.get = ->
      {then: (callback)->
        callback({
          completed_at: undefined,
          slides: [
            {
              caption: "hi",
              image_desktop_retina: "/fixtures/slide_one.jpg",
              completed_at: (new Date()).toString()
            },
            {
              caption: "how",
              image_desktop_retina: "/fixtures/slide_two.jpg",
              completed_at: (new Date()).toString()
            },
            {
              caption: "hidy",
              image_desktop_retina: "/fixtures/slide_one.jpg",
            }
          ]
        })
      }
  }
QUnit.test( "Initialized Slide Deck", ( assert )->
  Mocks.slideDeck.unfinished()
  done = assert.async()

  $$("#test-container").html(testSetup())
  widgets = window.Traitify.ui.init()

  widgets.slideDeck[0].on("initialized", ->
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

  widgets.slideDeck[0].on("initialized", ->
    $$(".tf-me").trigger("click")
    assert.ok( document.querySelector(".caption").innerHTML == "hi", "Passed!" )
    done()
  )
  widgets.assessmentId = "assessment-id"
  widgets.load()
)
