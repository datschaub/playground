var gulp = require('gulp'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify');

// Script Tasks
// Uglifies, 
gulp.task('scripts', function(){
	gulp.src('js/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(uglify())
	.pipe(gulp.dest('js/minjs'));
});

// Watch Task
// Watches JS
gulp.task('watch', function(){
	gulp.watch('js/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);