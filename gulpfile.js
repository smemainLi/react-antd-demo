let gulp = require('gulp');
let sftp = require('gulp-sftp');

gulp.task('upload', () => {
  return gulp.src('build/**').pipe(
    sftp({
      host: '10.10.22.146',
      port: 22,
      user: 'root',
      pass: 'qcloud',
      remotePath: '/opt/html'
    })
  );
});
