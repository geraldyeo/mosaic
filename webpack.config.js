const path = require('path');

const PATHS = {
	src: path.resolve(__dirname, 'src'),
	build: path.resolve(__dirname, 'dist/js')
};

module.exports = {
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['', '.js']
	},
	entry: {
		client: ['babel-polyfill', path.resolve(PATHS.src, 'client.js')]
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		preLoaders: [
			{test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/}
		],
		loaders: [
			{test: /\.js$/, loader: 'babel?cacheDirectory', exclude: /node_modules/},
			{test: /\.css$/, loader: 'style!css', exclude: /node_modules/}
		]
	}
};
