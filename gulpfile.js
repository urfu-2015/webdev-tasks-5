'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('react', function () {
    gulp.src('public/scripts/index.jsx')
    .pipe(babel({
            presets: ['react']
    }))
    .pipe(gulp.dest('public/scripts'));
});

var uglifyOrder = [
    'public/scripts/react.js',
    'public/scripts/react-dom.js',
    'public/scripts/classlib.js',
    'public/scripts/xhr.js',
    'public/scripts/taphandler.js',
    'public/scripts/taskhandler.js',
    'public/scripts/index.js'
];

gulp.task('uglify', function () {
    gulp.src(uglifyOrder)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/scripts'))
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('default', ['react', 'uglify']);