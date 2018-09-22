var gulp = require('gulp'),
    imageMin = require('gulp-imagemin'),
    less = require('gulp-less'),
    minCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify')


    gulp.task('build', function () {
    return gulp.src('src/*.html')
        .pipe(gulpif('*.css', minCSS()))
        .pipe(gulpif('*.less', less()))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify('Done!'));

});


gulp.task('images', function () {
    gulp.src('src/images/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('browserSync', function () {
    browserSync({
        server:{
        baseDir: 'src',
        }
    })
});

gulp.task('watch',['browserSync'], function () {
    gulp.watch('src/*.*less', ['less']);
});


