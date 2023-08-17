const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');

gulp.task('sass', function () {
  return gulp
    .src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});
gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
});


// gulp.task('indexscripts', function() {
//   return gulp.src(['js/hamburger-menu.js', 'js/explorer-adding-books.js', 'js/search-book.js', 'js/cart.js' ])
//     .pipe(concat('index.min.js')) 
//     .pipe(uglify()) 
//     .pipe(gulp.dest('js')); 
// });
// gulp.task('default', gulp.series('sass', 'watch', 'indexscripts'));


// gulp.task('shopscripts', function() {
//   return gulp.src(['js/hamburger-menu.js', 'js/shop-adding-books.js', 'js/search-book.js', 'js/cart.js' ])
//     .pipe(concat('shop.min.js')) 
//     .pipe(uglify()) 
//     .pipe(gulp.dest('js')); 
// });
// gulp.task('defaulttwo', gulp.series('sass', 'watch', 'shopscripts'));


// gulp.task('bookscripts', function() {
//   return gulp.src(['js/single-book-page.js', 'js/book-rating.js', 'js/cart.js' ])
//     .pipe(concat('book.min.js')) 
//     .pipe(uglify()) 
//     .pipe(gulp.dest('js')); 
// });
// gulp.task('defaultthree', gulp.series('sass', 'watch', 'bookscripts'));


// gulp.task('cartscripts', function() {
//   return gulp.src(['js/cart.js' ])
//     .pipe(concat('cart.min.js')) 
//     .pipe(uglify()) 
//     .pipe(gulp.dest('js')); 
// });
// gulp.task('defaultfour', gulp.series('sass', 'watch', 'cartscripts'));



