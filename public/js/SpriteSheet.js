export default class SpriteSheet {
  constructor(img, width, height) {
    this.img = img;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name, x, y, width, height) {
    const buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    buffer
      .getContext('2d')
      .drawImage(this.img, x, y, width, height, 0, 0, width, height);
    this.tiles.set(name, buffer);
  }

  defineTile(name, x, y) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(name, screen, x, y) {
    const buffer = this.tiles.get(name);
    screen.drawImage(buffer, x, y);
  }

  drawTile(name, screen, x, y) {
    this.draw(name, screen, x * 16, y * 16);
  }
}
