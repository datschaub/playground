var gulp = require('gulp'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	livereload = require('gulp-livereload');

// Script Tasks
// Uglifies, 
gulp.task('scripts', function(){
	gulp.src('js/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(uglify())
	.pipe(gulp.dest('js/minjs'))
	.pipe(livereload());
});

// LESS Compiling
gulp.task('styles', function(){
	gulp.src('less/main.less')
	.pipe(less())
	.pipe(gulp.dest('css'))
	.pipe(livereload());
});

// Watch Task
// Watches JS & LESS
gulp.task('watch', function(){

	var server = livereload.listen();

	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('less/*.less', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);