import gulp from 'gulp'
import bump from 'gulp-bump'
import start from 'gulp-start-process'
import moment from 'moment'
global.moment = moment

gulp.task('default', ['spec'])

gulp.task('server', ['server:dev'])
gulp.task('server:dev', (done) => {
  start('nodemon bin/server | bunyan', done)
})
gulp.task('server:prod', (done) => {
  start('pm2 bin/server', done)
})

;['major', 'minor', 'patch'].forEach((type) => {
  gulp.task(`bump:${type}`, ['build'], () =>
    gulp.src('./package.json')
    .pipe(bump({ type }))
    .pipe(gulp.dest('./'))
  )
})
gulp.task('bump', ['bump:patch'])

gulp.task('spec', (done) => {
  start('NODE_ENV=test ./node_modules/.bin/mocha --harmony --opts mocha.opts "specs/**/*Spec.js"', done)
})

gulp.task('remote:log', (done) => {
  start('ssh server "tail -f ~/node/tickets/shared/logs/tickets.log" | bunyan', done)
})
