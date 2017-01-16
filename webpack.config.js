// loading webpack utilities
var webpack = require('webpack');
var path=require('path');

module.exports = {
	// where to start
	// loading in paths of jquery, foundation, and original path
	// use script loader (scipt!)
	entry: [
		'script!jquery/dist/jquery.min.js',
		'script!foundation-sites/dist/foundation.min.js',
		'./app/app.jsx'
	],
	// provide set of key value pairs, where key is module name and value is variable name we want available in external script files
	externals: {
		jquery: 'jQuery',
		foundation: 'Foundation'
	},
	// create new provide plugin
	// have webpack look at which variable names to look for
	// takes in object of key value pairs, the key is variable name to watch for (in this case: '$' and 'jQuery') and value is module to replace it with (in this case: 'jquery')
	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery'
		})
	],
	//output
	output: {
		path: __dirname, //path to current folder
		filename: './public/bundle.js'
	},
	//resolve takes an extensions array
	// find any extensions that has either:
	// no extensions, .js, or .jsx
	resolve: {
		root: __dirname,
		// easy to root name
		alias: {
			Main: 'app/components/Main.jsx',
			applicationStyles: 'app/styles/app.scss',
			Navigation: 'app/components/Navigation.jsx',
			Timer: 'app/components/Timer.jsx',
			Countdown: 'app/components/Countdown.jsx',
			Clock: 'app/components/Clock.jsx',
			CountdownForm: 'app/components/CountdownForm.jsx',
			Controls: 'app/components/Controls.jsx'
		},
		extensions: ['', '.js', '.jsx']
		},
		module: {
		// telling babel loader to take our file
			loaders: [
			{
				loader: 'babel-loader',
				// parse through react
				// get output and run them through 3s2015
				query: {
					presets: ['react', 'es2015']
				},
				// tell it which file we want to apply the loader to
				// in this case, select every file that has a '.js' extension
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	// have sass be aware there are files we want to include
	sassLoader:{
		includePaths: [
			path.resolve(__dirname, './node_modules/foundation-sites/scss')
		]
	},
	// create source maps for debugging purposes only
	devtool: 'cheap-module-eval-source-map'
};
