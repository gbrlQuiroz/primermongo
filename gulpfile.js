var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var inject = require('gulp-inject');


gulp.task('minify-js', function () {
    gulp.src('./js/*.js')
        .pipe(concat('build.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/www/'));
});

gulp.task('minify-css',function(){
    gulp.src('./css/*.css')
    .pipe(concat('build.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/www/'));
});

gulp.task('index', function () {
    var injectOptions = {
        addRootSlash: false,
        ignorePath: 'dist'
    };
  var target = gulp.src('./index.html');
  var sources = gulp.src(['./dist/www/*.js', './dist/www/*.css'], {read: false}, {relative: true});
  return target.pipe(inject(sources, injectOptions))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compilar',['minify-js', 'minify-css']);

gulp.task('copy-img', function() {
  gulp.src('./img/**')
    .pipe( gulp.dest('./dist/img') );
});


/*
//falla por lo asincrono
gulp.task('compilar', ['minify-js', 'minify-css'], function () {
    var injectOptions = {
        addRootSlash: false,
        ignorePath: 'dist'
    };
  var target = gulp.src('./index.html');
  var sources = gulp.src(['./dist/www/*.js', './dist/www/*.css'], {read: false}, {relative: true});
  return target.pipe(inject(sources, injectOptions))
    .pipe(gulp.dest('./dist/'));
});
*/