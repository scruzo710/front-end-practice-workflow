var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// SCSS compilation
gulp.task('styles', function() {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(browserSync.stream());
});

// Live Browser Reload
gulp.task('serve', ['styles'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./assets/scss/**/*.scss',['styles']);
   //* gulp.watch('./assets/scss/**/*.scss',['styles']);//watch js files live
    gulp.watch("partials/*.html").on('change', browserSync.reload);
    gulp.watch("templates/*.html").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Default
gulp.task('default', ['serve']);