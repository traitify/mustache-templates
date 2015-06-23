Traitify.host = "https://api-sandbox.traitify.com"
Traitify.setProduction = (value)->
  if value
    @host = "https://api.traitify.com"
  else
    "https://api-sandbox.traitify.com"
Traitify.version = "v1"
