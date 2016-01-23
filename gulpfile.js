var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var image = require('gulp-image');
var wrap = require('gulp-wrap');

 
gulp.task('default',['babelify','minify'],() => {
});


gulp.task('babelify',['image'],()=> {
  return gulp.src(['src/animation.js','src/newDeck.js','src/shuffle.js','src/main.js'])
    .pipe(concat('main.js'))
    .pipe(wrap('document.addEventListener("DOMContentLoaded", ()=>{\n<%= contents %>\n});'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
  
});

gulp.task('minify',()=>{
  return gulp.src('dist/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('image', function () {
  gulp.src('src/*.png')
    .pipe(image())
    .pipe(gulp.dest('dist'));
});
