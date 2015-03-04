gulp = require 'gulp'
riot = require 'gulp-riot'
webserver = require('gulp-webserver');

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

gulp.task('default', ['riot', 'webserver', 'watch'])
