gulp = require 'gulp'
riot = require 'gulp-riot'
webserver = require('gulp-webserver');
fs = require("fs")
minify = require("minify")
path = require('path')
traitify = require('traitify')
coffee = require('gulp-coffee')
gutil = require('gulp-util')
qunit = require('gulp-qunit')
concat = require('gulp-concat')
runSequence = require('gulp-run-sequence')
yaml = require("js-yaml")
uglify = require('gulp-uglify')
rename = require("gulp-rename")
gzip = require('gulp-gzip')
notify = require("gulp-notify")

gulp.task('coffee', ->
  gulp.src('./src/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/js'))
)

gulp.task 'riot', ->
  gulp.src './src/**/*.tag'
    .pipe riot({type: "coffee"})
    .pipe gulp.dest './public/js'

gulp.task('webserver', ->
  gulp.src(['public', 'qunit'])
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      port: 8080
    }))
)

watch = require('gulp-watch');

gulp.task('watch', ->
  gulp.watch('./src/tags/*.tag', {}, ->
    gulp.start('riot')
  )
  gulp.watch('./src/**/*.coffee', {}, ->
    gulp.start('coffee')
  )
  gulp.watch('./public/js/**/*.js', {}, ->
    gulp.start("bundle:concat")
  )
  gulp.watch('./public/bundles/*.debug.js', {}, (event)->
    gulp.start("bundle:minify")
    gulp.start("bundle:compress")
    gulp.start('test')
  )
)
gulp.task('bundle:concat', (done)->
  bundles = yaml.safeLoad(fs.readFileSync('./bundles.yml', 'utf8'))
  bundleNames = Object.keys(bundles)
  for bundleName in bundleNames
    gulp.src(bundles[bundleName].map((name)-> "./#{name}.js"))
      .pipe(concat("#{bundleName}.debug.js"))
      .pipe(gulp.dest('./public/bundles/'))
      if bundleNames.indexOf(bundleName) == bundleNames.length - 1
        done()
)

gulp.task('bundle:minify', ->
  return gulp.src('./public/bundles/*.debug.js')
    .pipe(uglify())
    .pipe(rename((path)->
      path.basename = path.basename.replace(".debug", ".min")
    ))
    .pipe(gulp.dest('./public/bundles/'))
)

gulp.task('bundle:compress', ->
    gulp.src('./public/bundles/*.min.js')
    .pipe(gzip())
    .pipe(gulp.dest('./public/bundles'))
)

gulp.task('bundle', ->
  runSequence('coffee', 'riot', "bundle:concat", "bundle:minify", "bundle:compress")
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

gulp.task("traitify-config", (req, res)->
    traitify.setHost(process.env.TF_HOST)
    traitify.setVersion("v1")
    traitify.setSecretKey(process.env.TF_SECRET_KEY)
    traitify.createAssessment("career-deck", (assessment)->
      assessment
      assessment.publicKey = process.env.TF_PUBLIC_KEY
      assessment.host = process.env.TF_HOST
      fs.writeFileSync("./public/assessment.json", JSON.stringify(assessment))
    )
)

gulp.task("test", ->
  gulp.src('./qunit/tests.html').pipe(qunit(timeout: 30))
  .on("gulp-qunit.finished", (answer)->
    response = if answer.passed then "Tests Have Passed! :)" else "Tests Have Failed! :("
    gulp.src('./qunit/tests.html')
      .pipe(notify(response))
  )
)


gulp.task('default', ['coffee', 'webserver', 'watch', 'traitify-config'])
