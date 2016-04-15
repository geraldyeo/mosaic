import test from 'tape';

import ImageMosaic from '../../../../src/modules/ImageMosaic';
import {TILE_WIDTH, TILE_HEIGHT} from '../../../../src/mosaic';

const imgSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

let imageDOM;
let imageMosaic;

test('setup', t => {
	imageDOM = document.createElement('img');
	imageDOM.src = imgSrc;
	imageMosaic = new ImageMosaic({TILE_WIDTH, TILE_HEIGHT, image: imageDOM, window});

	t.equal(imageDOM.src, imgSrc, 'image source should be equal');
	t.end();
});

test('instantiate with no options', t => {
	t.plan(1);

	t.throws(() => {
		let imageMosaic = new ImageMosaic(); // eslint-disable-line
	}, 'should throw error when instantiating with no options');
});

test('instantiated', t => {
	t.equal(imageMosaic.canvas instanceof window.HTMLCanvasElement, true, 'canvas should be an instance of HTMLCanvasElement');
	t.ok(imageMosaic.canvasContext, 'canvas context should exist');
	t.end();
});

test('process()', t => {
	const {dx, dy} = imageMosaic.process();
	t.equal(typeof dx, 'number', 'dx should be a number');
	t.equal(typeof dy, 'number', 'dx should be a number');
	t.end();
});

test('process()', t => {
	t.plan(3);

	imageMosaic.sample().then(samples => {
		const {dx, dy, tileColors} = samples;
		t.equal(typeof dx, 'number', 'dx should be a number');
		t.equal(typeof dy, 'number', 'dx should be a number');
		t.equal(tileColors instanceof Array, true, 'tileColors should be an array');
	});
});
