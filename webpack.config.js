const path = require('path');

const PATHS = {
	src: path.resolve(__dirname, 'src'),
	build: path.resolve(__dirname, 'dist/js')
};

module.exports = {
	entry: {
		client: ['babel-polyfill', path.resolve(PATHS.src, 'client.js')]
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	}
};
