Traitify.ui = {
  deviceType: (
    if /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      "Phone"
    else
      "desktop"
  )
  init: (options = Object())->
    riot.observable(options)
    options.slideDeck ?= Object()
    options.slideDeck.target ?= ".tf-slide-deck"
    options.slideDeck.tag ?= "tf-slide-deck"
    options.results ?= Object()
    Traitify.setPublicKey(options.publicKey) if options.publicKey
    delete options.publicKey
    for item in ["personality-blend", "personality-types", "personality-traits", "famous-people", "careers"]
      dataName = item.replace(/-([a-z])/g, (g)-> g[1].toUpperCase())
      options.results[dataName] ?= Object()
      options.results[dataName].tag ?= "tf-#{item}"
      options.results[dataName].target ?= ".tf-#{item}"

    options.load = ->
      that = this

      scopes = "slides,blend,types,traits,career_matches"
      args = "image_pack=linear&data=#{scopes}"
      for slideDeck in options.slideDeck
        slideDeck.assessmentId = options.assessmentId
      Traitify.get("/assessments/#{options.assessmentId}?#{args}").then((assessment)->
        if assessment.completed_at == undefined
          options.slideDeck.mount = riot.mount(options.slideDeck.target, options.slideDeck.tag, options)[0]
          options.slideDeck.mount.slides = assessment.slides
          options.on("slideDeck.finish", ->
            that.load();
          )
          options.slideDeck.mount.initialize()
        else
          for resultName in Object.keys(that.results)
            widget = that.results[resultName]
            that.results[resultName].mount = riot.mount(widget.target, widget.tag, options)[0]
            that.results[resultName].mount.assessmentId = that.assessmentId
            for key in Object.keys(assessment)
              that.results[resultName].mount[key] = assessment[key]
            that.results[resultName].mount.initialize()

      )
      return this
    return options
}
