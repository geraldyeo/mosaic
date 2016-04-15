import test from 'tape';

import ImageLoader from '../../../../src/modules/ImageLoader';

const markup =
`<div id="fileDrop" class="imageLoader">
  <input id="fileSelect" name="fileSelect" class="fileSelect" type="file"/>
  <label for="fileSelect">
	<strong>Choose a file</strong>
	<span class="fileDnd">or drag it here</span>.
  </label>
</div>

<div class="imageMosaic">
  <img class="preview" src="" alt="">
  <div id="mosaic" class="mosaic"></div>
</div>`;

let fileSelectDOM;
let fileDropDOM;
let imageLoader;

test('setup', t => {
	const appDOM = document.createElement('div');
	appDOM.id = 'app';
	appDOM.classList.add('app');
	appDOM.innerHTML = markup;

	fileSelectDOM = appDOM.querySelector('.fileSelect');
	fileDropDOM = appDOM.querySelector('.imageLoader');
	imageLoader = new ImageLoader({fileSelectDOM, fileDropDOM, window});

	t.ok(fileSelectDOM, 'fileSelectDOM should exist');
	t.ok(fileDropDOM, 'fileDropDOM should exist');
	t.end();
});

test('instantiate with no options', t => {
	t.plan(1);

	t.throws(() => {
		let imageLoader = new ImageLoader(); // eslint-disable-line
	}, 'should throw error when instantiating with no options');
});

test('hasAdvanceSupport()', t => {
	t.equal(imageLoader.hasAdvanceSupport(), true, 'hasAdvanceSupport should be true');
	t.end();
});
