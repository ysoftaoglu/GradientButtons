var gulp = require("gulp"),
		sass = require("gulp-sass"),
		concat = require("gulp-concat"),
		autoPrefixer = require("gulp-autoprefixer"),
		uglify = require("gulp-uglify"),
		babel = require("gulp-babel"),
		browserSync = require('browser-sync'),
		reload = browserSync.reload,
		plumber = require("gulp-plumber");


gulp.task("js", function() {
	
	gulp.src('./js/**/*.js')
		.pipe(plumber())
		.pipe(babel({ presets: ['es2015'] })) 
		.pipe(uglify())
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(reload({stream:true}));
});

gulp.task("sass", function() {
	
	gulp.src('./sass/**/*.sass')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(concat('min.css'))
		.pipe(autoPrefixer())
		.pipe(gulp.dest('./dist/css/'))
		.pipe(reload({stream:true}));
});

gulp.task("sass:forButton", function() {
	gulp.src('./gradient-buttons/**/*.sass')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(concat('gradient-buttons.min.css'))
		.pipe(autoPrefixer())
		.pipe(gulp.dest('./gradient-buttons/'))
		.pipe(reload({stream:true}));
});

gulp.task("html", function() {
	gulp.src("./*.html")
		.pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task("watch", function() {
	gulp.watch("./*.html", ['html']);
	gulp.watch("./sass/**/*.sass", ['sass']);
});

gulp.task('default', ['sass', 'html', 'browser-sync', 'watch']);
