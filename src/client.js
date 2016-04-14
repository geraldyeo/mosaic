import ImageLoader from './modules/ImageLoader';
import ImageMosaic from './modules/ImageMosaic';
import {TILE_WIDTH, TILE_HEIGHT} from './mosaic';

(global => {
	const fileSelectDOM = document.getElementById('fileSelect');
	const fileDropDOM = document.getElementById('fileDrop');
	const imageLoader = new ImageLoader({fileSelectDOM, fileDropDOM, window: global});

	imageLoader.listen()
		.then(imageDOM => {
			const imageMosaic = new ImageMosaic({TILE_WIDTH, TILE_HEIGHT, image: imageDOM, window: global});
			return imageMosaic.sample();
		})
		.then(tileColors => {
			console.log(tileColors);
		})
		.catch(e => {
			console.error(e);
		});
})(window);
