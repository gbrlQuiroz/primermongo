var gulp = require('gulp');
var map = require('map-stream');
var file = require('gulp-file');


gulp.task('crear', function () {
    var archivo = process.argv[4];
    var contenidoPug = 'extends layout\n\nblock content';
    var contenidoJS = 'var express = require(\'express\');\nvar router = express.Router();\n\nmodule.exports = router;';
    var appRoutes = 'var ' + archivo + ' = require(\'./routes/' + archivo + '\');'
    var appRecursos = 'app.use(\'/' + archivo + '\',' + archivo + ');';
    
    gulp.src('', { nodir: true })
        .pipe(file(archivo + '.pug', contenidoPug))
        .pipe(gulp.dest('./views/'));
    gulp.src('', { nodir: true })
        .pipe(file(archivo + '.js', contenidoJS))
        .pipe(gulp.dest('./routes/'));

    gulp.src('./app.js')
        .pipe(map(function (file, cb) {
            var fileContents = file.contents.toString();
            fileContents = fileContents.replace('//gulp-rutas', appRoutes + '\n//gulp-rutas');
            fileContents = fileContents.replace('//gulp-recursos', appRecursos + '\n//gulp-recursos');
            file.contents = new Buffer(fileContents);
            cb(null, file);
        }))
        .pipe(gulp.dest('./'));


});