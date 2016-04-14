import ImageLoader from './modules/ImageLoader';
import ImageMosaic from './modules/ImageMosaic';

import {TILE_WIDTH, TILE_HEIGHT} from './mosaic';
import './styles/page.css';

// http://stackoverflow.com/a/5624139
function rgbToHex(r, g, b) {
	return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function fetchSVGTile(url) {
	var headers = new Headers();
	headers.append('Content-Type', 'image/svg+xml');
	var request = new Request(url, {headers});

	return fetch(request);
}

function renderRow(results) {
	const div = document.createElement('div');
	div.classList.add('svgs');

	return Promise.all(results.map(res => res.text()))
		.then(svgs => {
			svgs.forEach(svg => {
				div.innerHTML += svg;
			});
			return div;
		});
}

function ready() {
	return new Promise(resolve => {
		if (document.readyState === 'complete') {
			resolve();
		} else {
			document.addEventListener('DOMContentLoaded', resolve);
		}
	});
}

// main
(global => {
	const fileSelectDOM = document.getElementById('fileSelect');
	const fileDropDOM = document.getElementById('fileDrop');
	const mosaicDOM = document.getElementById('mosaic');
	const imageLoader = new ImageLoader({fileSelectDOM, fileDropDOM, window: global});

	ready().then(() => {
		imageLoader.listen()
			.then(imageDOM => {
				const imageMosaic = new ImageMosaic({TILE_WIDTH, TILE_HEIGHT, image: imageDOM, window: global});
				return imageMosaic.sample();
			})
			.then(async samples => {
				for (let i = 0, len = samples.tileColors.length, chunk = samples.dx; i < len;) {
					let tmp = samples.tileColors.slice(i, i + chunk);
					tmp = tmp.map(sample => rgbToHex(sample.r, sample.g, sample.b))
							.map(hex => fetchSVGTile(`/color/${hex}`));

					await Promise.all(tmp).then(async results => {
						const row = await renderRow(results);
						mosaicDOM.appendChild(row);
						i += chunk;
					});
				}
			})
			.catch(e => {
				console.error(e);
			});
	});
})(window);
