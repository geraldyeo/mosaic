export default class ImageLoader {
	constructor(options) {
		this.window = options.window;
		this.fileSelectDOM = options.fileSelectDOM;
		this.fileDropDOM = options.fileDropDOM;
	}

	hasAdvanceSupport() {
		var div = this.window.document.createElement('div');
		return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in this.window && 'FileReader' in this.window;
	}

	listen() {
		return new Promise((resolve, reject) => {
			if (this.hasAdvanceSupport()) {
				this.fileDropDOM.addEventListener('dragover', e => e.preventDefault());
				this.fileDropDOM.addEventListener('dragenter', e => e.preventDefault());
				this.fileDropDOM.addEventListener('drop', e => {
					e.preventDefault();
					const preview = this.window.document.querySelector('img.preview');
					const file = e.dataTransfer.files[0];
					this._readImageFile(file, preview, resolve, reject);
				});

				this.fileSelectDOM.addEventListener('change', () => {
					const preview = this.window.document.querySelector('img.preview');
					const file = this.window.document.querySelector('input[type=file]').files[0];
					this._readImageFile(file, preview, resolve, reject);
				});
			} else {
				reject('Browser is not supported.');
			}
		});
	}

	_readImageFile(file, previewDOM, resolve, reject) {
		const reader = new FileReader();

		reader.addEventListener('load', () => {
			previewDOM.src = reader.result;
			resolve(reader.result);
		});

		reader.addEventListener('error', () => {
			reject('Error reading image.');
		});

		if (file) {
			reader.readAsDataURL(file);
		}
	}
}
