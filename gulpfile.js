var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var inject = require('gulp-inject');


gulp.task('minify-js', function () {
    gulp.src('./app/js/*.js')
        .pipe(concat('build.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/www/'));
});

gulp.task('minify-css', function () {
    gulp.src('./app/css/*.css')
        .pipe(concat('build.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/www/'));
});

gulp.task('index', function () {
    var injectOptions = {
        addRootSlash: false,
        ignorePath: 'dist'
    };
    var target = gulp.src('./app/index.html');
    var sources = gulp.src(['./dist/www/*.js', './dist/www/*.css'], { read: false }, { relative: true });
    return target.pipe(inject(sources, injectOptions))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-img', function () {
    gulp.src('./app/img/**')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('compilar', ['minify-js', 'minify-css']);
gulp.task('compilar2', ['index', 'copy-img']);

gulp.task('watch', function() {
  gulp.watch('./app/js/*.js', ['minify-js']);
  gulp.watch('./app/css/*.css', ['minify-css']);
  gulp.watch('./app/*.html', ['index']);
  gulp.watch('./app/img/**', ['copy-img']);
});

gulp.task('default', ['watch']);