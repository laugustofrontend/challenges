const gulp = require('gulp');
const bs = require('browser-sync');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const browserSync = done => {
  bs.init({
    server: {
      baseDir: './src'
    },
    open: false,
    reloadOnRestart: true
  });

  done();
}

const browserSyncReload = done => {
  bs.reload()
  done();
}

const styles = () => {
  return gulp
    .src('./src/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(bs.stream())
}

const watchFiles = () => {
  gulp.watch('./src/*.html', gulp.series(browserSyncReload));
  gulp.watch('./src/assets/css/**/*.css', gulp.series(browserSyncReload));
  gulp.watch('./src/assets/sass/**/*.scss', gulp.series(styles, browserSyncReload));
  gulp.watch('./src/assets/js/**/*.js', gulp.series(browserSyncReload));
}

gulp.task('watch', gulp.parallel(watchFiles, browserSync))
