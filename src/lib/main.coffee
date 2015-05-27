Traitify.ui = {
  init: (options = Object())->
    options.slideDeck ?= Object()
    options.slideDeck.target ?= ".tf-slide-deck"
    options.slideDeck.tag ?= "tf-slide-deck"
    options.slideDeck.options ?= Object()
    options.results ?= ["personality-blend", "personality-types", "personality-traits", "famous-people"].map((item)->
      {
        target: ".tf-#{item}"
        tag: "tf-#{item}"
        dataName: item.replace(/-/g, "_")
      }
    )
    options.load = ->
      that = this
      scopes = "slides,blend,types,traits"
      args = "image_pack=linear&data=#{scopes}"
      options.slideDeck.options.assessmentId = options.assessmentId
      Traitify.get("/assessments/#{options.assessmentId}?#{args}").then((assessment)->
        if assessment.completed_at == undefined
          options.slideDeck.options.slides = assessment.slides
          options.slideDeck.options.onFinished ?= (widget)->
            that.load()
          riot.mount(that.slideDeck.target, that.slideDeck.tag, that.slideDeck.options)
        else
          for widget in that.results
            widget.options ?= Object()
            for key in Object.keys(assessment)
              widget.options[key] = assessment[key]
            riot.mount(widget.target, widget.tag, widget.options)
      )
    return options
  load: (assessmentId, slideDeck, options)->
    options.assessmentId = assessmentId
    widgets = @init(options)
    for widget in widgets.slideDeck
        widget.target = slideDeck
      widget.assessmentId = assessmentId
    widgets.load()
}
