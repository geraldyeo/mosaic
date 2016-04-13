// var webpack = require('webpack');

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

		files: [{
			pattern: './tests-bundler.js',
			watched: false,
			served: true,
			included: true
		}],

		preprocessors: {
			['tests-bundler.js']: ['webpack', 'sourcemap']
		},

		webpack: {
			node: {
				fs: 'empty'
			},
			devtool: 'inline-source-map',

			// Instrument code that isn't test or vendor code.
			module: {
				postLoaders: [{
					test: /\.js$/,
					exclude: /(test|node_modules)\//,
					loader: 'istanbul-instrumenter'
				}]
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
			type: 'text',
			dir: 'coverage/'
		},

		plugins: [
			require('karma-webpack'),
			require('karma-tap'),
			require('karma-tap-reporter'),
			require('karma-sourcemap-loader'),
			require('karma-electron-launcher'),
			require('karma-coverage')
		]
	});
};
