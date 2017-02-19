import gulp from 'gulp'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
import sourcemap from 'gulp-sourcemaps'

gulp.task('build', () =>
  gulp.src('./src/**/*.js')
  .pipe(sourcemap.init())
  .pipe(babel())
  .pipe(sourcemap.write())
  .pipe(gulp.dest('./dist'))
)

gulp.task('lint', () =>
  gulp.src('./src/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())

)

gulp.task('default', ['lint'], () => {
  gulp.start('build')
})
