QUnit.test( "Personality Types Initialized", ( assert )->
  Mocks.slideDeck.finished()
  Mocks.results.all()

  done = assert.async()

  $$("#test-container").html(testSetup())
  widgets = window.Traitify.ui.init()

  widgets.on("personalityTypes.initialized", ->
    value = $$("body").shouldHave("here")
    assert.ok(value, "Passed!")
    done()
    $types = $$(".tf-type")
    $types[0]
  )
  widgets.assessmentId = "assessment-id"
  widgets.load()
)

QUnit.test( "Personality Types Click Type", ( assert )->
  Mocks.slideDeck.finished()
  Mocks.results.all()

  done = assert.async()

  $$("#test-container").html(testSetup())
  widgets = window.Traitify.ui.init()

  widgets.on("personalityTypes.initialized", ->
    value = $$("body").shouldHave("here")
    assert.ok(value, "Passed!")
    done()
    $types = $$(".tf-type")
    $types.first().trigger("click")
    $$(".tf-personality-types .tf-description").shouldHave("Here is a description")
    $types.last().trigger("click")
    $$(".tf-personality-types .tf-description").shouldHave("Here is a description 2")
  )
  widgets.assessmentId = "assessment-id"
  widgets.load()
)
