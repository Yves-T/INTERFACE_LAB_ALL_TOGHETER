var gulp       = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    gutil        = require('gulp-util'),
    browserSync  = require('browser-sync').create(),
    jade         = require('gulp-jade'),
    uglify       = require('gulp-uglify');

gulp.task('sass', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['bower_components/bootstrap/scss']
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/tether/dist/js/tether.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'src/js/**/*.js'
        ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('jade', function () {
    return gulp.src('src/jade/*.jade')
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: "192.168.33.10",
        open: false
    });
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/jade/**/*.jade', ['jade']);
});

gulp.task('default', ['browser-sync', 'sass', 'js', 'jade', 'watch']);
