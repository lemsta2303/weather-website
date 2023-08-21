const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('sass', function () {
  return gulp
    .src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
});

gulp.task('build-scripts', function() {
  return gulp.src(['js/mobile-menu.js', 'js/weather.js', 'js/canvas-graph.js', 'js/week-days-slider.js', 'js/options.js', 'js/cities-choice.js'])
    .pipe(concat('scripts.min.js')) 
    .pipe(uglify()) 
    .pipe(gulp.dest('js')); 
});

gulp.task('default', gulp.series('sass', 'build-scripts', 'watch'));