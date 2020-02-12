'use strict'

let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync').create();
let babel = require("gulp-babel");
let concat = require('gulp-concat');
let surge = require('gulp-surge')

let scriptsArray = [
  './epea/packages/epea/Resources/Public/ie_JavaScript/main.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/headerWithTitle.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/ie_responsiveBg.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/selectbox.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/slickScript.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/plus.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/slickDouble.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/slickSliderWithRange.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/navMenu.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/double.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/slickScript.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/slickSliderButtonsBottom.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/sort.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/cards-carousel.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/list.js',
  './epea/packages/epea/Resources/Public/ie_JavaScript/videoSlider.js'
]

function fastDeploy () {
  return surge({
    project: './',
    domain: 'ginganoua.surge.sh'
  })
}

function concatScripts () {
  return gulp.src(scriptsArray)
    .pipe(concat('ie_main.js'))
    .pipe(gulp.dest('./epea/packages/epea/Resources/Public/JavaScript/'));
}

function style () {
  return gulp.src('./Scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({cascade: false}))
    .pipe(gulp.dest('./Css'))
    .pipe(browserSync.stream())
}

function refactor () {
  return gulp.src("./epea/packages/epea/Resources/Public/JavaScript/*.js", "./node_modules/@babel/polyfill")
    .pipe(babel())
    .pipe(gulp.dest("./epea/packages/epea/Resources/Public/ie_JavaScript/"));
}

function watch () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./Scss/*.scss', style);
  gulp.watch('./Scss/*/*.scss', style);
  gulp.watch('./JavaScript/*js').on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

function build () {
  return gulp.src('./epea/packages/epea/Resources/Public/Scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({cascade: false}))
    .pipe(gulp.dest('./epea/packages/epea/Resources/Public/Css'))
}

exports.style = style;
exports.watch = watch;
exports.build = build;
exports.babel = refactor;
exports.concat = concatScripts;
exports.surge = fastDeploy;