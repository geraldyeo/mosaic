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

		this.canvas.width = this.image.naturalWidth;
		this.canvas.height = this.image.naturalHeight;
		this.canvasContext.drawImage(this.image, 0, 0);
	}

	render() {}

	getAverageColor() {}
}
