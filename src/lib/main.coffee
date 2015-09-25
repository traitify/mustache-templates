Traitify.ui = {
  deviceType: (
    if /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      "Phone"
    else
      "desktop"
  )
  widgets: Object()
  widget: (name, args)->
    @widgets[name] = args
  init: (options = Object())->
    Traitify.ui.observable(options)
    options.slideDeck ?= Object()
    options.slideDeck.target ?= ".tf-slide-deck"
    options.slideDeck.tag ?= "tf-slide-deck"
    options.results ?= Object()
    Traitify.setPublicKey(options.publicKey) if options.publicKey
    delete options.publicKey

    options.render = ->
      that = this

      scopes = "slides,blend,types,traits,career_matches"
      args = "image_pack=linear&data=#{scopes}"
      for slideDeck in options.slideDeck
        slideDeck.assessmentId = options.assessmentId
      Traitify.get("/assessments/#{options.assessmentId}?#{args}").then((assessment)->
        if assessment.completed_at == undefined
          options.slideDeck.mount = document.querySelector(options.slideDeck.target)
          widget = Traitify.ui.widgets[options.slideDeck.tag]
          data = Object()
          for assessmentName in Object.keys(assessment)
            if widget.data.indexOf(assessmentName) != -1
              data[assessmentName] = assessment[assessmentName]
          view = Mustache.render(widget.template, assessment)
          options.slideDeck.mount.innerHTML = view
          for innerScript in widget.scripts
            script = document.createElement("script")
            script.innerHTML = innerScript
            options.slideDeck.mount.appendChild(script)
          options.slideDeck.mount.traitify.data = data
          options.slideDeck.mount.traitify.assessmentId = assessment.id;
          options.slideDeck.mount.traitify.initialize()
          options.slideDeck.mount.traitify.mount = options.slideDeck.mount;
          options.slideDeck.mount.traitify.on("finish", ->
            that.render()
          )
        else
          for name in Object.keys(assessment)
            widget = Traitify.ui.widgets[name]
            console.log("widget")
            console.log(Traitify.ui.widgets)
            console.log("/widget")
            #that.results[resultName].mount = Object()
            #that.results[resultName].mount.assessmentId = that.assessmentId
            #for key in Object.keys(assessment)
            #  that.results[resultName].mount[key] = assessment[key]
            #that.results[resultName].mount.initialize()

      )
      return this
    return options
  observable: (options)->
    options.observable = {
      events: Object()
    }
    options.on = (key, callback)->
      unless options.observable.events[key]?
        options.observable.events[key] = [callback]
      else
        options.observable.events[key].push(callback)
    options.trigger = (key, args)->
      for onEvent in options.observable.events[key]
        onEvent(args)
    return options
}
