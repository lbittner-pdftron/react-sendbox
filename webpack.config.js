var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

var config = {

  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval',
  entry: [

	// For hot style updates
	// 'webpack/hot/dev-server',
	'webpack/hot/only-dev-server',
	// The script refreshing the browser on none hot updates
	'webpack-dev-server/client?http://localhost:8088',

	// Our application
	mainPath],
  output: {

	// We need to give Webpack a path. It does not actually need it,
	// because files are kept in memory in webpack-dev-server, but an
	// error will occur if nothing is specified. We use the buildPath
	// as that points to where the files will eventually be bundled
	// in production
	path: buildPath,
	filename: 'bundle.js',

	// Everything related to Webpack should go through a build path,
	// localhost:3000/build. That makes proxying easier to handle
	publicPath: '/build/'

  },
  module: {

	loaders: [

	// I highly recommend using the babel-loader as it gives you
	// ES6/7 syntax and JSX transpiling out of the box
	{
	  test: /\.js$/,
	  loaders: ['react-hot', 'babel'],
	  exclude: [nodeModulesPath]
	},

	{
		test: /\.js$/,
		exclude: /node_modules/,
		loader: "babel-loader?optional=runtime"
	},
	{
        test: /\.scss$/,
        loader: "style!css!sass?outputStyle=expanded&" +
          "includePaths[]=" +
            (path.resolve(__dirname, "./bower_components/foundation"))
  	},

	// Let us also add the style-loader and css-loader, which you can
	// expand with less-loader etc.
	{
	  test: /\.css$/,
	  loader: 'style!css'
	},
	{
	  test: /\.json$/,
	  loader: 'json-loader'
	},
	{ test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true' },

	{
	  //tell webpack to use jsx-loader for all *.jsx files
	  test: /\.jsx$/,
	  loaders: ['react-hot', 'jsx?harmony'],
	  exclude: [nodeModulesPath, mainPath]
	}

	]
  },
  // externals: {
  //     //don't bundle the 'react' npm package with our bundle.js
  //     //but get it from a global 'React' variable
  //     'react': 'React'
  // },
  resolve: {
	extensions: ['', '.js', '.jsx']
  },
  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [
	new Webpack.HotModuleReplacementPlugin(),
	new Webpack.NoErrorsPlugin()
  ]
};

module.exports = config;