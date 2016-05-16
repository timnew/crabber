import gulp from 'gulp'
import bump from 'gulp-bump'
import git from 'gulp-git'
import tagVersion from 'gulp-tag-version'
import start from 'gulp-start-process'
import moment from 'moment'
global.moment = moment

gulp.task('default', ['spec'])

;['major', 'minor', 'patch'].forEach((type) => {
  gulp.task(`bump:${type}`, ['build'], () =>
    gulp.src('./package.json')
    .pipe(bump({ type }))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('bumps version'))
    .pipe(tagVersion())
  )
})
gulp.task('bump', ['bump:patch'])

gulp.task('spec', (done) => {
  start('NODE_ENV=test ./node_modules/.bin/mocha --harmony --opts mocha.opts "specs/**/*Spec.js"', done)
})
