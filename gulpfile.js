
// Add required dependences
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Create Task
function compile_sass(done) {

	gulp.src('./src/scss/style.scss') 	// Call file path
		.pipe(sourcemaps.init())			// init sourcemaps
		.pipe(sass({ 					// compile scss to css
			errorLogToConsole: true,  	// log errors
			outputStyle: 'compressed'	// minifi scss
		}))
		.on('error', console.error.bind(console)) // bind logging errors to console
		.pipe(autoprefixer({						// call autoprefixer 
			cascade: false
		}))
		.pipe(rename({suffix: '.min'})) // rename .scss file, with adding suffix ".min"
		.pipe(sourcemaps.write('./'))	// Write sourcemaps
		.pipe(gulp.dest('./src/css/')) // define destenation for compiled .css file
		.pipe(browserSync.stream()); 	// write changes into browserSync

  	done(); // call task

}

// WATCHING SCSS CHANGES
function watch_files() {

	gulp.watch("./src/scss/**/*.scss", compile_sass); // Watching changes in .scss files
	gulp.watch("./src/**/*.html", reload_browser); // Watching changes in .scss files
	gulp.watch("./src/**/*.php", reload_browser); // Watching changes in .scss files
	gulp.watch("./src/**/*.js", reload_browser); // Watching changes in .scss files


}

function reload_browser(done) {
	browserSync.reload();
	done();
}

// LIVERELOAD
function livereload(done) {

	browserSync.init({
		server: {
			baseDir: "./src/" // base dir
		},
		port: 3000 // port
	});

	done(); // call argument

}


// Export Task
gulp.task(watch_files);
gulp.task(livereload);
gulp.task('default', gulp.parallel(livereload, watch_files)); // parallel running tasks (for serial use ".serias")

// Or Like This
// exports.default = defaultTask;

// Export Default Task
// gulp.task('default', defaultTask);