Traitify.ui = {
  init: (options = Object())->
    options.slideDeck ?= Object()
    options.slideDeck.target ?= ".tf-slide-deck"
    options.slideDeck.tag ?= "tf-slide-deck"
    options.slideDeck = riot.mount(options.slideDeck.target, options.slideDeck.tag)
    for item in ["personality-blend", "personality-types", "personality-traits", "famous-people", "careers"]
      dataName = item.replace(/-([a-z])/g, (g)-> g[1].toUpperCase())
      options[item] ?= Object()
      options[item].tag ?= "tf-#{item}"
      options[item].target ?= ".tf-#{item}"
      options[dataName] = riot.mount(".tf-#{item}", options[item].tag)

    options.load = ->
      that = this

      scopes = "slides,blend,types,traits,career_matches"
      args = "image_pack=linear&data=#{scopes}"
      options.slideDeck.assessmentId = options.assessmentId
      Traitify.get("/assessments/#{options.assessmentId}?#{args}").then((assessment)->
        if assessment.completed_at == undefined
          for deck in options.slideDeck
            deck.slides = assessment.slides
            deck.on("finish", ->
              that.load()
            )
            deck.initialize()
        else
          for widget in that.results
            for key in Object.keys(assessment)
              widget[key] = assessment[key]
              widget.assessmentId = assessment.id
              widget.initialize()
      )
      return this
    return options
  on: (event, callback)->

}
