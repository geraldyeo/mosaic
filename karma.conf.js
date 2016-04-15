var webpackConfig = require('./webpack.config');

module.exports = function (config) {
	config.set({
		browsers: ['Electron'],
		singleRun: 'false',
		frameworks: ['tap'],
		basePath: '',
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,

		files: [
			'tests-bundler.js'
		],

		// list of files to exclude
		exclude: [
		],

		preprocessors: {
			'tests-bundler.js': ['webpack', 'sourcemap']
		},

		webpack: {
			node: {
				fs: 'empty'
			},
			devtool: 'inline-source-map',
			resolve: webpackConfig.resolve,
			module: {
				preLoaders: [
					{test: /\.js$/, loader: 'isparta', exclude: /(tests|node_modules)/}
				],
				loaders: webpackConfig.module.loaders
			}
		},

		webpackMiddleware: {
			noInfo: true
		},

		reporters: [
			'tap',
			'coverage'
		],

		coverageReporter: {
			type: 'text'
		}
	});
};
