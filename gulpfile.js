'use strict'

let autoprefixer = require('gulp-autoprefixer')
let csso = require('gulp-csso')
let del = require('del')
let gulp = require('gulp')
let htmlmin = require('gulp-htmlmin')
let runSequence = require('run-sequence')
let sass = require('gulp-sass')
let uglify = require('gulp-uglify')

// Supported Browsers
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
]

// Gulp task to minify SCSS files
gulp.task('styles', () => {
    return gulp.src('/src/sass/styles.scss')
        // Compile SASS files
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, '[ERROR]: Sass error:')
        }))
        // Auto-prefix css styles for cross browser compatibility
        .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(csso())
        // Output
        .pipe(gulp.dest('./css'))
})

// Gulp task to minify Javascript files
gulp.task('scripts', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
})

// Gulp task to minify HTML files
gulp.task('html', () => {
    return gulp.src(['./src/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./'))
})

// Clean output directory
gulp.task('clean', () => del(['dist']))

// Gulp task to minify all files
gulp.task('default', ['clean'], () => {
    runSequence(
        'styles',
        'scripts',
        'html'
    )
})