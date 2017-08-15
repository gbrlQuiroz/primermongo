var gulp = require('gulp');
var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var minifycss = require('gulp-minify-css');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var deletefile = require('gulp-delete-file');

/*
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
*/
gulp.task('crea-route', function () {
    /* gulp.src('./views/*NEW.pug')
    .pipe(concat('*NEW.js'))
    .pipe(gulp.dest('./routes/')); */

    /* gulp.src('./views/*NEW.pug')
        .pipe(rename('**.js'))
        .pipe(gulp.dest('./routes/')); */

    gulp.src('./views/*.pugNEW')
        .pipe(rename(function (path) {
            //path.dirname += '/ciao';
            path.basename += '';
            path.extname = '.js';
        }))
        .pipe(gulp.dest('./routes/'));

    gulp.src('./views/*.pugNEW')
        .pipe(rename(function (path) {
            //path.dirname += '/ciao';
            path.basename += '';
            path.extname = '.pug';
        }))
        .pipe(gulp.dest('./views/'));

    gulp.src('./views/*.pugNEW')
        .pipe(deletefile());


});

gulp.task('renombrar', function () {
    gulp.src('./views/*NEW.pug')
        .pipe(rename('**.js'))
        .pipe(gulp.dest('./routes/'));
});

gulp.task('paramet', function () {
    console.log(process.argv[4]);
});

var file = require('gulp-file');
var map = require('map-stream');
gulp.task('crear', function () {
    var archivo = process.argv[4];
    var contenidoPug = 'extends layout';
    var contenidoJS = 'var express = require(\'express\');';
    var appRutas = 'var ' + archivo + ' = require(\'./routes/' + archivo + '\');';
    var appRecursos = 'app.use(\'/' + archivo + '\',' + archivo + ');';
    gulp.src('', {
            nodir: true
        })
        .pipe(file(archivo + '.pug', contenidoPug))
        .pipe(gulp.dest('./views/'));
    gulp.src('', {
            nodir: true
        })
        .pipe(file(archivo + '.js', contenidoJS))
        .pipe(gulp.dest('./routes/'));

    gulp.src('./app.js')
        .pipe(map(function (file, cb) {
            var contenidoApp = file.contents.toString();
            contenidoApp = contenidoApp.replace('//hola-rutas', appRutas + '\n//hola-rutas');
            contenidoApp = contenidoApp.replace('//hola-recursos', appRecursos + '\n//hola-recursos');
            file.contents = new Buffer(contenidoApp);
            cb(null, file);
        }))
        .pipe(gulp.dest('./'));

    gulp.src('./views/primermongo')
        .pipe(deletefile());



});