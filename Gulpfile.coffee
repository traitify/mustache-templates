gulp = require 'gulp'
riot = require 'gulp-riot'
webserver = require('gulp-webserver');
fs = require("fs")
minify = require("minify")
path = require('path')
traitify = require('traitify')

gulp.task 'riot', ->
  gulp.src './src/**/*.tag'
    .pipe riot({type: "coffeescript"})
    .pipe gulp.dest './public/js'

gulp.task('webserver', ->
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      port: 8080,
      open: true
    }))
)

watch = require('gulp-watch');

gulp.task('watch', ->
  gulp.watch('./src/tags/*.tag', {}, ->
    gulp.start('riot')
  )
)

gulp.task('bundles', ->
  express = require('express')
  app = express()

  app.get('/bundle', (req, res)->
    files = req.query.packages.split(",")
    filesContent = Array()
    filesContent.push(fs.readFileSync("./public/support/riot.js", "utf8"))
    req.headers.accept = 'application/js';
    for file in files
      filesContent.push(fs.readFileSync("./public/js/tags/#{file}.js", "utf8"))
      filesContent.push("; ")
    writePath = (type)->
      "./public/js/bundles/#{req.query.packages.replace(/,/g, "_")}#{type}.js"
    fs.writeFileSync(writePath("_raw"), filesContent.join(""))

    minify(writePath("_raw"), (error, minified)->
      fs.writeFileSync(writePath(".min"), minified)
      res.redirect(writePath(".min").replace("./public", ""))
    )
  )
  app.use(express.static(path.join(__dirname, 'public')));
  app.listen(3000)
)

gulp.task("traitify-server", (req, res)->
  express = require("express")
  cors = require("cors")
  app = express()
  app.use(cors())
  app.post("/assessments", (req, res)->
    traitify.setHost(process.env.TF_HOST)
    traitify.setVersion("v1")
    traitify.setSecretKey(process.env.TF_SECRET_KEY)
    traitify.createAssessment(req.query.deck, (assessment)->
      res.send(assessment)
    )
  )
  app.post("/credentials", (req, res)->
    res.send({publicKey: process.env.TF_PUBLIC_KEY, host: process.env.TF_HOST})
  )
  app.listen(1376)
)


gulp.task('default', ['riot', 'webserver', 'watch', 'traitify-server'])
