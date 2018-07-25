/* eslint-disable no-console */
const gulp = require('gulp');

gulp.task('server:start', () => {
    return require('../src/bin/server');
});
