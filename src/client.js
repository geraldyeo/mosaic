import ImageLoader from './modules/ImageLoader';
import ImageMosaic from './modules/ImageMosaic';
import {TILE_WIDTH, TILE_HEIGHT} from './mosaic';

(global => {
	const fileSelectDOM = document.getElementById('fileSelect');
	const fileDropDOM = document.getElementById('fileDrop');
	const imageLoader = new ImageLoader({fileSelectDOM, fileDropDOM, window: global});
	imageLoader.listen()
		.then(image => {
			const imageMosaic = new ImageMosaic({TILE_WIDTH, TILE_HEIGHT, image, window: global});
			const renderMosaicRow = imageMosaic.render();
			renderMosaicRow.next();
		})
		.catch(e => {
			console.error(e);
		});
})(window);
