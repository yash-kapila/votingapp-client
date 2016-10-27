var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var mod = require("./config/config.json");

module.exports = function(){
	var config = {
		entry: {
			vendor: mod.vendor,
			main: mod.entry
		},
		output: {
			path: __dirname+'/_build/app',
			filename: 'app.[chunkhash].js'
		},
		resolve: {
			root: [
				__dirname+'/bower_components'
			],
			modulesDirectories: ["node_modules", "bower_components"]
		},
		module: {
			loaders: [
				{ test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
				{ test: /\.html$/, loader: 'ngtemplate-loader?relativeTo=views/!html'},		
				{ test: /\.(jpg|png|gif)$/, loader: 'file-loader?name=images/[name].[ext]'},
				{ test: /\.(ttf|eot|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=fonts/[name].[ext]' }
			]
		},
		plugins: [
			new ExtractTextPlugin('./bundle.[chunkhash].css'),			
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
			}),
			new webpack.ResolverPlugin(
  				new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
			),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.DedupePlugin()
		]
	};
	
	config.debug = true;
	config.devtool = 'eval';

	config.plugins = config.plugins.concat(
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.[chunkhash].js")
	);

	return config;
};