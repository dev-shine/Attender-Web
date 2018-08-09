'use strict';

//Load the plugins
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	notify = require("gulp-notify"),
	sourcemaps = require('gulp-sourcemaps');

// compile scss and minify.
// this can run from Terminal with $ gulp sass.
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
	//We use .pipe() to pipe the source file(s) to a plugin.
	//compile the scss
	.pipe(sourcemaps.init())  // Process the original sources
		.pipe(sass.sync().on('error', sass.logError))
		//add browser prefixes
		.pipe(autoprefixer({
				browsers: ['last 10 versions'],
				cascade: false
		}))
	.pipe(sourcemaps.write()) // Add the map to modified source.
	// rename
	.pipe(rename("style.min.css"))
	//output it in
	.pipe(gulp.dest('src/'))
	//notify for successful sass compilation
	.pipe(notify({
			title: "Sass done!!!"
	}));
});

//watch files and performs tasks when an event happens.
gulp.task('watch', function() {
	// Watch .scss files
	gulp.watch('src/scss/**/*.scss', ['sass']);
})

// What will be run with simply writing "$ gulp"
gulp.task('default', ['sass', 'watch']);