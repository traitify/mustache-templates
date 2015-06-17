express = require("express")
cors = require("cors")

app = express()
app.use(cors())
app.get("*", (req, res)->
  "https://api-sandbox.traitify.com/v1#{req.path}"
)

app.listen(8585)
