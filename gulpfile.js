/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var minifyCss = require('gulp-clean-css');
var pump = require('pump');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

var paths = {
    webroot: "./wwwroot/"
};

paths.app = paths.webroot + "app";
paths.dist = paths.app + "/dist/";

var tsProject = ts.createProject('tsconfig.json');

gulp.task('thirdparty', function () {
    gulp.src('./node_modules/core-js/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/core-js'));
    gulp.src('./node_modules/@angular/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/@angular'));
    gulp.src('./node_modules/zone.js/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/zone.js'));
    gulp.src('./node_modules/systemjs/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/systemjs'));
    gulp.src('./node_modules/reflect-metadata/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/reflect-metadata'));
    gulp.src('./node_modules/rxjs/**/*.js')
        .pipe(gulp.dest('./wwwroot/node_modules/rxjs'));
    gulp.src('./node_modules/font-awesome/**/*.{css,otf,eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('./wwwroot/node_modules/font-awesome'));
});


gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('scripts',function() {
    var tsResult = tsProject.src()
                    .pipe(sourcemaps.init())
                    .pipe(ts(tsProject));
    return merge([
        tsResult.js.pipe(sourcemaps.write('.', { sourceRoot: function (file) { return file.cwd + paths.app } }))
                   .pipe(gulp.dest(paths.app)),
        tsResult.dts.pipe(gulp.dest(paths.app))
    ]);
});

gulp.task('sass', function() {
    return gulp.src('./app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass({onError: function(err) {
            return notify().write(err);
        }}))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('minify-css',['sass'], function() {
    return gulp.src('./app/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('watch-sass', function() {
    gulp.watch('./app/scss/**/*.scss', ['sass', 'minify-css']);
});

gulp.task('watch-ts', function() {
    gulp.watch('./app/**/*.ts', ['scripts']);
});
