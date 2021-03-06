var gulp = require('gulp'),
	rename = require('gulp-rename'),
//    concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css');
//	browserSync = require('browser-sync');

gulp.task('minify', function(){
	gulp.src('app/js/calcanddraw.js')
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('app/js'));
});

gulp.task('minify-css', () => {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('app/css'));
});

gulp.task('default', defaultTask);

function defaultTask(done) {
  //gulp.watch('vendor/*[^\.min].js', ['uglify']);

  done();
}