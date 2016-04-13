export default class ImageMosaic {
	constructor(options) {
		this.tileColors = [];

		this.TILE_WIDTH = options.TILE_WIDTH;
		this.TILE_HEIGHT = options.TILE_HEIGHT;
		this.image = options.image;
		this.window = options.window;
		this.document = this.window.document;
		this.canvas = this.document.createElement('canvas');
		this.canvasContext = this.canvas.getContext('2d');
	}

	// generator to yield each row
	* render() {
		const {dx, dy} = this.process();
		let x = 0;
		let y = 0;

		console.log(dx, dy, x, y);

		yield this.tileColors;
	}

	process() {
		const dx = (this.canvas.width / this.TILE_WIDTH) | 0;
		const dy = (this.canvas.height / this.TILE_HEIGHT) | 0;
		this.canvas.width = this.image.naturalWidth;
		this.canvas.height = this.image.naturalHeight;
		this.canvasContext.drawImage(this.image, 0, 0);
		return {dx, dy};
	}

	getAverageColor() {}
}
