var gulp = require("gulp");
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var del = require('del');
var mod = require("./config/config.json");

// build index.html
function buildIndexHtml() {
	var indexHtmlPath = mod.index;
	var outputPath = __dirname+'/_build/app';
	
	var injectPaths = gulp.src([
		outputPath+'/vendor*.js',
		outputPath+'/*.js',
		outputPath+'/*.css'
	],{
		read: false,
		cwd: outputPath
	});
	
	return gulp.src(indexHtmlPath)
		.pipe(inject(injectPaths, {addRootSlash: false}))
		.pipe(gulp.dest(outputPath));
}

// clean _build dir
gulp.task('clean', function() {
	del.sync(['./_build/**']);
});

// build dev/uat/prod
function build() {
	return function(done) {
		var config = webpackConfig();

		// run Webpack bundler
		webpack(config, function(err, stats) {
			if(err) {				
                console.log(err);
			}

			// build index.html
			buildIndexHtml();
		});
	}
}

gulp.task('build',  build());

gulp.task('default', ['build']);