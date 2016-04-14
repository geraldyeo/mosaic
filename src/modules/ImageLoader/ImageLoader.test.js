import test from 'ava';
import {jsdom} from 'jsdom';

import ImageLoader from './index';

const markup = `
<!DOCTYPE html>
<html>
  <head>
    <title>Mosaic</title>
  </head>
  <body>
    <div id="app" class="app">
      <div id="fileDrop" class="imageLoader">
        <input id="fileSelect" name="fileSelect" class="fileSelect" type="file"/>
        <label for="fileSelect">
          <strong>Choose a file</strong>
          <span class="fileDnd">or drag it here</span>.
        </label>
      </div>

      <div class="imageMosaic">
        <img class="preview" src="" alt="">
        <div id="mosaic" class="mosaic"></div>
      </div>
    </div>
  </body>
</html>
`;

let doc;
let win;
let fileSelectDOM;
let fileDropDOM;
let imageLoader;

test.before(() => {
	doc = jsdom(markup);
	win = doc.defaultView;
	fileSelectDOM = doc.getElementById('fileSelect');
	fileDropDOM = doc.getElementById('fileDrop');
	imageLoader = new ImageLoader({fileSelectDOM, fileDropDOM, window: win});
});

test('instantiate with no options', t => {
	t.throws(() => {
		let imageLoader = new ImageLoader();
	});
});

test('hasAdvanceSupport', t => {
	t.true(imageLoader.hasAdvanceSupport());
});
