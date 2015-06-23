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
            },
            career_matches: [{
              career: {
                title: "hihih",
                experience_level: {
                  id: 3,
                  name: "Medium Preparation Needed",
                  experience: "Previous work-related skill, knowledge, or experience is required for these occupations. For example, an electrician must have completed three or four years of apprenticeship or several years of vocational training, and often must have passed a licensing exam, in order to perform the job.",
                  education: "Most occupations in this zone require training in vocational schools, related on-the-job experience, or an associate's degree.",
                  job_training: "Employees in these occupations usually need one or two years of training involving both on-the-job experience and informal training with experienced workers. A recognized apprenticeship program may be associated with these occupations.",
                  examples: "These occupations usually involve using communication and organizational skills to coordinate, supervise, manage, or train others to accomplish goals. Examples include food service managers, electricians, agricultural technicians, legal secretaries, occupational therapy assistants, and medical assistants.",
                  svp_range: "(6.0 to < 7.0)"
                ​},
                salary_projection: {
                  source: "Bureau Of Labor Statistics - May 2013",
                  total_employees: 33680,
                  hourly_rate_10_percentile: 8.4,
                  hourly_rate_25_percentile: 9.42,
                  hourly_rate_75_percentile: 18.83,
                  hourly_rate_90_percentile: 27.37,
                  hourly_rate_median: 13.92,
                  hourly_rate_mean: 15.86,
                  annual_salary_10_percentile: 17480,
                  annual_salary_25_percentile: 19590,
                  annual_salary_75_percentile: 39160,
                  annual_salary_90_percentile: 56930,
                  annual_salary_median: 28940,
                  annual_salary_mean: 32990​
                },
                employment_projection: {
                    source: "Bureau Of Labor Statistics - 2012",
                    annual_salary_median_2012: 28640,
                    total_employees_2012: 44400,
                    total_employees_2022: 62000,
                    new_openings_2022: 17700,
                    new_openings_and_replacement_2022: 21300,
                    percent_growth_2022: 39.8​
                }
              }
              score: 10
            }]
        })
      }
}
