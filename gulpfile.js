var gulp = require('gulp');
var clean = require('gulp-clean'),
    imagemin = require ('gulp-imagemin'),
    concat = require ('gulp-concat'),
    uglify = require ('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyhtml = require ('gulp-minify-html'),
    autoprefixer = require ('gulp-autoprefixer'),
    sass = require('gulp-sass');
var browserSync = require('browser-sync').create();



// SCSS compilation
gulp.task('styles', function() {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});

// JS
gulp.task('scripts', function () {
    return gulp.src('./assets/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./dist/js/'))
    browserSync.reload();
});

// Clean

// Live Browser Reload
gulp.task('serve', ['styles'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./assets/scss/**/*.scss',['styles']);
    gulp.watch('./assets/scripts/*.js',['scripts']);
    gulp.watch("partials/*.html").on('change', browserSync.reload);
    gulp.watch("templates/*.html").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Default
gulp.task('default', ['serve']);