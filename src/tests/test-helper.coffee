testSetup = ->
  """
    <div class='tf-slide-deck'></div>
    <div class='tf-careers'></div>
    <div class='tf-career'></div>
    <div class='tf-personality-traits'></div>
    <div class='tf-personality-types'></div>
    <div class='tf-famous-people'></div>
    <div class='tf-personality-blend'></div>

  """
Mocks = Object()
Mocks.slideDeck = {
  unfinished: (after = ->)->
    Traitify.get = ->
      {then: (callback)->
        callback({
          completed_at: undefined,
          slides: [
            {
              id: "oaunth",
              caption: "hi",
              image_desktop_retina: "/fixtures/slide_one.jpg",
            },
            {
              id: "aoeu",
              caption: "how",
              image_desktop_retina: "/fixtures/slide_two.jpg",
            },
            {
              id: "aoeuaoueaoeu",
              caption: "hidy",
              image_desktop_retina: "/fixtures/slide_one.jpg",
            }
          ]
        })
        after()
      }
    Traitify.put = ->
      ""
  finished: (after = ->)->
    Traitify.get = ->
      {then: (callback)->
        callback({
          completed_at: new Date(),
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
        after()
      }

  addSlides: (after = ->)->
    Traitify.addSlides = ->
      {then: (callback)->
        callback({
            slides: undefined,
            personality_types:{
              hi: ""
            }
        })
        after()
      }
}
Mocks.results = {
  all: ->
    Traitify.get = ->
      {then: (callback)->
        callback({
            completed_at: new Date(),
            slides: [],
            personality_traits: [],
            personality_types: [{
              personality_type: {
                name: "here"
                badge: {
                  color_1: "#aaa"
                },
                famous_people: [{

                }]
              },
              score: 10
            },{
              personality_type:{
                name: "here"
                badge: {
                  color_1: "#aaa"
                },
                famous_people: [{

                }]
              },
              score: 10
            }],
            personality_blend: {
                personality_type_1: {badge:
                  {color_1: "#aaa"}
                },
                personality_type_2: {badge:
                    {color_1: "#aaa"}
                }
            }
        })
      }
}
