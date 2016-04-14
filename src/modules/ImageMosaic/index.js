export default class ImageMosaic {
	constructor(options) {
		this.TILE_WIDTH = options.TILE_WIDTH;
		this.TILE_HEIGHT = options.TILE_HEIGHT;
		this.image = options.image;
		this.window = options.window;
		this.document = this.window.document;
		this.canvas = this.document.createElement('canvas');
		this.canvasContext = this.canvas.getContext('2d');
	}

	sample() {
		const tw = this.TILE_WIDTH;
		const th = this.TILE_HEIGHT;
		const context = this.canvasContext;
		const {dx, dy} = this._process();
		let x = 0;
		let y = 0;
		let tileColors = [];

		return new Promise(resolve => {
			(function _sample() {
				while (x < dx) {
					let r = 0;
					let g = 0;
					let b = 0;
					let i = 0;
					let data = context.getImageData(x * tw, y * th, tw, th).data;
					let dataLen = data.length;
					let count = dataLen / 4; // each pixel is represented by four one-byte values (red, green, blue, and alpha)

					// calc tile's average color by adding each component
					while (i < dataLen) {
						r += data[i++];
						g += data[i++];
						b += data[i++];
						i++;
					}

					tileColors.push({
						r: (r / count) | 0,
						g: (g / count) | 0,
						b: (b / count) | 0
					});

					x++;
				}
				y++; // next row;

				if (y < dy) {
					x = 0;
					setTimeout(() => _sample(), 0); // nextTick
				} else {
					resolve({tileColors, dx, dy});
				}
			})();
		});
	}

	_process() {
		this.canvas.width = this.image.naturalWidth;
		this.canvas.height = this.image.naturalHeight;
		this.canvasContext.drawImage(this.image, 0, 0);
		const dx = (this.canvas.width / this.TILE_WIDTH) | 0;
		const dy = (this.canvas.height / this.TILE_HEIGHT) | 0;
		return {dx, dy};
	}
}
